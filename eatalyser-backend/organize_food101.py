import os
import shutil

# Paths
base_dir = 'food-101'  # Make sure this matches your folder
image_dir = os.path.join(base_dir, 'images')
train_txt = os.path.join(base_dir, 'meta', 'train.txt')
test_txt = os.path.join(base_dir, 'meta', 'test.txt')

# Function to copy files to organized folders
def organize_dataset(txt_file, target_dir):
    with open(txt_file, 'r') as f:
        lines = f.read().splitlines()
    for line in lines:
        label, image_name = line.split('/')
        src = os.path.join(image_dir, label, image_name + '.jpg')
        dst_dir = os.path.join(base_dir, target_dir, label)
        os.makedirs(dst_dir, exist_ok=True)
        shutil.copy(src, dst_dir)

# Organize training and testing data
organize_dataset(train_txt, 'train')
organize_dataset(test_txt, 'test')

print("✅ Dataset successfully organized into train/ and test/ folders!")
