import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import numpy as np
import cv2
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load class names
try:
    with open("models/classes.txt") as f:
        class_names = [line.strip() for line in f.readlines()]
    logger.info(f"Successfully loaded {len(class_names)} class names")
except Exception as e:
    logger.error(f"Failed to load class names: {str(e)}")
    raise

# Load the trained ResNet18 model
try:
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info(f"Using device: {device}")
    
    model = models.resnet18(pretrained=False)
    num_classes = len(class_names)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    
    model_path = "models/food101_resnet18.pth"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
        
    model.load_state_dict(torch.load(model_path, map_location=device))
    model = model.to(device)
    model.eval()
    logger.info("Successfully loaded and initialized model")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    raise

# Preprocessing for ResNet18
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])

def preprocess_image(image_path: str):
    try:
        logger.info(f"Preprocessing image: {image_path}")
        img = Image.open(image_path).convert('RGB')
        logger.info(f"Original image size: {img.size}")
        
        # Resize image if it's too large
        max_size = 1024
        if max(img.size) > max_size:
            ratio = max_size / max(img.size)
            new_size = tuple(int(dim * ratio) for dim in img.size)
            img = img.resize(new_size, Image.Resampling.LANCZOS)
            logger.info(f"Resized image to: {img.size}")
        
        img_tensor = preprocess(img)
        logger.info(f"Successfully preprocessed image")
        return img_tensor
    except Exception as e:
        logger.error(f"Failed to preprocess image: {str(e)}")
        raise

def segment_food(image_path: str):
    try:
        logger.info(f"Starting image segmentation for: {image_path}")
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Could not read the image file: {image_path}")
            
        logger.info(f"Image dimensions: {img.shape}")
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply multiple preprocessing steps
        # 1. Gaussian blur
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        logger.info("Applied Gaussian blur")
        
        # 2. CLAHE (Contrast Limited Adaptive Histogram Equalization)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        enhanced = clahe.apply(blurred)
        logger.info("Applied CLAHE enhancement")
        
        # 3. Adaptive thresholding with multiple attempts
        thresh_methods = [
            (cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 11, 2),
            (cv2.ADAPTIVE_THRESH_MEAN_C, 11, 2),
            (cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 15, 5)
        ]
        
        best_segments = []
        for method, block_size, c in thresh_methods:
            thresh = cv2.adaptiveThreshold(
                enhanced,
                255,
                method,
                cv2.THRESH_BINARY_INV,
                block_size,
                c
            )
            
            # Apply morphological operations
            kernel = np.ones((3,3), np.uint8)
            thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
            thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
            
            # Find contours
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            logger.info(f"Found {len(contours)} contours with method {method}")
            
            # Adjust area thresholds based on image size
            min_area = img.shape[0] * img.shape[1] * 0.005  # 0.5% of image area
            max_area = img.shape[0] * img.shape[1] * 0.95   # 95% of image area
            
            segments = []
            for contour in contours:
                area = cv2.contourArea(contour)
                if min_area < area < max_area:
                    x, y, w, h = cv2.boundingRect(contour)
                    aspect_ratio = float(w)/h
                    if 0.1 < aspect_ratio < 10:  # More lenient aspect ratio
                        segments.append((x, y, w, h))
                        logger.info(f"Found segment: area={area}, aspect_ratio={aspect_ratio}, position=({x}, {y}, {w}, {h})")
            
            if len(segments) > len(best_segments):
                best_segments = segments
                logger.info(f"Found better segmentation with method {method}: {len(segments)} segments")
        
        logger.info(f"Final segmentation found {len(best_segments)} segments")
        return img_rgb, best_segments
    except Exception as e:
        logger.error(f"Failed to segment food: {str(e)}")
        raise

def recognize_food(image_path: str):
    try:
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file not found: {image_path}")
            
        logger.info(f"Starting food recognition for image: {image_path}")
        original_img, segments = segment_food(image_path)
        if not segments:
            logger.warning("No food segments found in the image")
            return []
            
        logger.info(f"Processing {len(segments)} food segments")
        best_detection = None
        best_confidence = 0
        temp_dir = "temp_segments"
        os.makedirs(temp_dir, exist_ok=True)
        
        for x, y, w, h in segments:
            try:
                padding = 30
                x1 = max(0, x - padding)
                y1 = max(0, y - padding)
                x2 = min(original_img.shape[1], x + w + padding)
                y2 = min(original_img.shape[0], y + h + padding)
                segment = original_img[y1:y2, x1:x2]
                
                segment_pil = Image.fromarray(segment)
                temp_path = os.path.join(temp_dir, f"segment_{x}_{y}.jpg")
                segment_pil.save(temp_path)
                
                img_tensor = preprocess_image(temp_path).unsqueeze(0).to(device)
                with torch.no_grad():
                    outputs = model(img_tensor)
                    probs = torch.softmax(outputs, dim=1)
                    top_prob, top_idx = torch.max(probs, 1)
                    
                    # Only keep the highest confidence detection
                    if top_prob.item() > best_confidence:
                        best_confidence = top_prob.item()
                        best_detection = class_names[top_idx.item()]
                        logger.info(f"New best detection: {best_detection} with confidence {best_confidence:.2f}")
                
                os.remove(temp_path)
            except Exception as e:
                logger.error(f"Failed to process segment at ({x}, {y}): {str(e)}")
                continue
                
        # Clean up temp directory if empty
        if not os.listdir(temp_dir):
            os.rmdir(temp_dir)
            
        if best_detection and best_confidence > 0.4:
            logger.info(f"Final detection: {best_detection} with confidence {best_confidence:.2f}")
            return [best_detection]
        
        logger.info("No confident detections found")
        return []
    except Exception as e:
        logger.error(f"Failed to recognize food: {str(e)}")
        raise