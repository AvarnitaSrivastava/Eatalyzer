from sqlalchemy.orm import Session
from . import models, schemas
from .models import Meal, MealItem, FoodItem, User
from .schemas import MealCreate, MealItemCreate
from sqlalchemy.orm import joinedload
from . import models, schemas, auth
from .auth import hash_password

def create_user(db: Session, user: schemas.UserCreate):
    # Calculate target calories based on user info
    hashed_password = auth.get_password_hash(user.password)
    target_calories = calculate_target_calories(user)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        age=user.age,
        weight=user.weight,
        height=user.height,
        gender=user.gender,
        activity_level=user.activity_level,
        dietary_plan=user.dietary_plan,
        target_calories=target_calories,
        dietary_preferences=user.dietary_preferences,
        allergies=",".join(user.allergies) if user.allergies else ""
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    

    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_food_item(db: Session, food: schemas.FoodItemCreate):
    db_food = models.FoodItem(
        name=food.name,
        calories=food.calories,
        protein=food.protein,
        carbs=food.carbs,
        fat=food.fat,
        calories_per_serving=food.calories_per_serving,
        serving_size=food.serving_size,
        category=food.category
    )
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food
def calculate_target_calories(user: schemas.UserCreate):
    weight = user.weight
    height = user.height
    age = user.age
    gender = user.gender
    activity_level = user.activity_level
    dietary_plan = user.dietary_plan

    # Set activity factor
    activity_factors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }
    activity_factor = activity_factors.get(activity_level, 1.2)

    # BMR calculation based on gender
    if gender.lower() == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:  # female
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    maintenance = bmr * activity_factor

    if dietary_plan == "weight_loss":
        return int(maintenance - 500)
    elif dietary_plan == "weight_gain":
        return int(maintenance + 500)
    elif dietary_plan == "gym":
        return int(maintenance + 200)
    else:  # maintenance
        return int(maintenance)
def get_food_by_name(db: Session, name: str):
    return db.query(models.FoodItem).filter(models.FoodItem.name == name).first()
def get_food_item(db: Session, food_id: int):
    return db.query(models.FoodItem).filter(models.FoodItem.id == food_id).first()

def get_food_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.FoodItem).offset(skip).limit(limit).all()

def create_meal(db: Session, user_id: int, meal: schemas.MealCreate):
    total_protein = sum(item.protein for item in meal.items)
    total_carbs = sum(item.carbs for item in meal.items)
    total_fat = sum(item.fat for item in meal.items)
    total_calories = sum(item.calories for item in meal.items)
    db_meal = models.Meal(
        user_id=user_id,
        total_calories=total_calories,
        items=[
            models.MealItem(
                food_name=item.food_name,
                quantity=item.quantity,
                calories=item.calories,
                protein=item.protein,
                carbs=item.carbs,
                fat=item.fat
                
            ) for item in meal.items
        ]
    )
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    # Return the meal with its items loaded
    return db.query(models.Meal).options(joinedload(models.Meal.items)).filter(models.Meal.id == db_meal.id).first()


def get_meal(db: Session, meal_id: int):
    return db.query(Meal).options(joinedload(Meal.items)).filter(Meal.id == meal_id).first()

def get_meals_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Meal).filter(models.Meal.user_id == user_id).order_by(models.Meal.timestamp.desc()).offset(skip).limit(limit).all()

# crud.py

def log_scanned_food(db: Session, user_id: int, food_name: str, calories: float):
    scanned_food = models.ScannedFood(
        user_id=user_id,
        food_name=food_name,
        calories=calories
    )
    db.add(scanned_food)
    db.commit()
    db.refresh(scanned_food)
    return scanned_food

def get_scanned_foods(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.ScannedFood).filter(models.ScannedFood.user_id == user_id).order_by(models.ScannedFood.timestamp.desc()).offset(skip).limit(limit).all()



def get_meal_history(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Meal).options(joinedload(models.Meal.items)).filter(models.Meal.user_id == user_id).order_by(models.Meal.timestamp.desc()).offset(skip).limit(limit).all()

def add_favorite_food(db: Session, user_id: int, food_item_id: int):
    favorite = models.FavoriteFood(user_id=user_id, food_item_id=food_item_id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return favorite

def remove_favorite_food(db: Session, user_id: int, food_item_id: int):
    favorite = db.query(models.FavoriteFood).filter_by(user_id=user_id, food_item_id=food_item_id).first()
    if favorite:
        db.delete(favorite)
        db.commit()
    return favorite

def get_favorite_foods(db: Session, user_id: int):
    return db.query(models.FavoriteFood).filter_by(user_id=user_id).all()