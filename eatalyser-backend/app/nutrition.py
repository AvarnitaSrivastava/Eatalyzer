from sqlalchemy.orm import Session
from .models import FoodItem
from typing import List, Dict
import requests
from typing import List, Dict

USDA_API_KEY = "nu7KmjkCLghSMJC4Mxp7cyUZW0O8eRwdJ8IMIi6A"

# Mapping of Food-101 names to common food names
FOOD_NAME_MAPPING = {
    "beet_salad": "beet salad",
    "baby_back_ribs": "pork ribs",
    "apple_pie": "apple pie",
    "beef_carpaccio": "beef carpaccio",
    "beef_tartare": "beef tartare",
    "beignets": "beignets",
    "bibimbap": "bibimbap",
    "bread_pudding": "bread pudding",
    "breakfast_burrito": "breakfast burrito",
    "bruschetta": "bruschetta",
    "caesar_salad": "caesar salad",
    "cannoli": "cannoli",
    "caprese_salad": "caprese salad",
    "carrot_cake": "carrot cake",
    "ceviche": "ceviche",
    "cheesecake": "cheesecake",
    "cheese_plate": "cheese plate",
    "chicken_curry": "chicken curry",
    "chicken_quesadilla": "chicken quesadilla",
    "chicken_wings": "chicken wings",
    "chocolate_cake": "chocolate cake",
    "chocolate_mousse": "chocolate mousse",
    "churros": "churros",
    "clam_chowder": "clam chowder",
    "club_sandwich": "club sandwich",
    "crab_cakes": "crab cakes",
    "creme_brulee": "creme brulee",
    "croque_madame": "croque madame",
    "cup_cakes": "cupcakes",
    "deviled_eggs": "deviled eggs",
    "donuts": "donuts",
    "dumplings": "dumplings",
    "edamame": "edamame",
    "eggs_benedict": "eggs benedict",
    "escargots": "escargots",
    "falafel": "falafel",
    "filet_mignon": "filet mignon",
    "fish_and_chips": "fish and chips",
    "foie_gras": "foie gras",
    "french_fries": "french fries",
    "french_onion_soup": "french onion soup",
    "french_toast": "french toast",
    "fried_calamari": "fried calamari",
    "fried_rice": "fried rice",
    "frozen_yogurt": "frozen yogurt",
    "garlic_bread": "garlic bread",
    "gnocchi": "gnocchi",
    "greek_salad": "greek salad",
    "grilled_cheese_sandwich": "grilled cheese sandwich",
    "grilled_salmon": "grilled salmon",
    "guacamole": "guacamole",
    "gyoza": "gyoza",
    "hamburger": "hamburger",
    "hot_and_sour_soup": "hot and sour soup",
    "hot_dog": "hot dog",
    "huevos_rancheros": "huevos rancheros",
    "hummus": "hummus",
    "ice_cream": "ice cream",
    "lasagna": "lasagna",
    "lobster_bisque": "lobster bisque",
    "lobster_roll_sandwich": "lobster roll",
    "macaroni_and_cheese": "macaroni and cheese",
    "macarons": "macarons",
    "miso_soup": "miso soup",
    "mussels": "mussels",
    "nachos": "nachos",
    "omelette": "omelette",
    "onion_rings": "onion rings",
    "oysters": "oysters",
    "pad_thai": "pad thai",
    "paella": "paella",
    "pancakes": "pancakes",
    "panna_cotta": "panna cotta",
    "peking_duck": "peking duck",
    "pho": "pho",
    "pizza": "pizza",
    "pork_chop": "pork chop",
    "poutine": "poutine",
    "prime_rib": "prime rib",
    "pulled_pork_sandwich": "pulled pork sandwich",
    "ramen": "ramen",
    "ravioli": "ravioli",
    "red_velvet_cake": "red velvet cake",
    "risotto": "risotto",
    "samosa": "samosa",
    "sashimi": "sashimi",
    "scallops": "scallops",
    "seaweed_salad": "seaweed salad",
    "shrimp_and_grits": "shrimp and grits",
    "spaghetti_bolognese": "spaghetti bolognese",
    "spaghetti_carbonara": "spaghetti carbonara",
    "spring_rolls": "spring rolls",
    "steak": "steak",
    "strawberry_shortcake": "strawberry shortcake",
    "sushi": "sushi",
    "tacos": "tacos",
    "takoyaki": "takoyaki",
    "tiramisu": "tiramisu",
    "tuna_tartare": "tuna tartare",
    "waffles": "waffles"
}

def fetch_from_usda(food_name: str) -> Dict:
    # Try with the mapped name first
    search_name = FOOD_NAME_MAPPING.get(food_name, food_name.replace('_', ' '))
    
    search_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
    params = {
        "api_key": "nu7KmjkCLghSMJC4Mxp7cyUZW0O8eRwdJ8IMIi6A",
        "query": search_name,
        "pageSize": 5  # Increased to get more potential matches
    }
    
    try:
        response = requests.get(search_url, params=params)
        if response.status_code != 200:
            return None
            
        data = response.json()
        if not data.get("foods"):
            return None
            
        # Try to find the best match
        foods = data["foods"]
        best_match = None
        best_score = 0
        
        for food in foods:
            description = food.get("description", "").lower()
            # Calculate a simple matching score
            score = sum(word in description for word in search_name.lower().split())
            if score > best_score:
                best_score = score
                best_match = food
        
        if not best_match:
            return None
            
        # Extract nutrition info
        nutrients = {n["nutrientName"]: n["value"] for n in best_match.get("foodNutrients", [])}
        
        # Get the most relevant nutrients
        return {
            "name": food_name,  # Keep original name for consistency
            "calories": nutrients.get("Energy", None),
            "protein": nutrients.get("Protein", None),
            "carbs": nutrients.get("Carbohydrate, by difference", None),
            "fat": nutrients.get("Total lipid (fat)", None),
            "source": "usda"
        }
    except Exception as e:
        print(f"Error fetching from USDA: {str(e)}")
        return None

def get_nutrition_info(db, food_names: List[str]) -> List[Dict]:
    results = []
    for name in food_names:
        # Try USDA first
        nutrition = fetch_from_usda(name)
        
        if nutrition and all(v is not None for v in [nutrition["calories"], nutrition["protein"], nutrition["carbs"], nutrition["fat"]]):
            results.append(nutrition)
        else:
            # If USDA fails or returns incomplete data, use default values based on food type
            default_nutrition = get_default_nutrition(name)
            results.append(default_nutrition)
    
    return results

def get_default_nutrition(food_name: str) -> Dict:
    # Default nutrition values based on food categories
    if "salad" in food_name:
        return {
            "name": food_name,
            "calories": 150,
            "protein": 5,
            "carbs": 15,
            "fat": 8,
            "source": "default"
        }
    elif "ribs" in food_name or "steak" in food_name or "beef" in food_name:
        return {
            "name": food_name,
            "calories": 350,
            "protein": 25,
            "carbs": 0,
            "fat": 28,
            "source": "default"
        }
    elif "cake" in food_name or "dessert" in food_name:
        return {
            "name": food_name,
            "calories": 300,
            "protein": 4,
            "carbs": 45,
            "fat": 15,
            "source": "default"
        }
    else:
        # Generic default values
        return {
            "name": food_name,
            "calories": 250,
            "protein": 10,
            "carbs": 30,
            "fat": 12,
            "source": "default"
        }