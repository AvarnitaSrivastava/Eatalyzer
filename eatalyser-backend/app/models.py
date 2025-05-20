from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
from .database import engine, Base
from sqlalchemy import UniqueConstraint

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True)  # in kg
    height = Column(Float, nullable=True)  # in cm
    activity_level = Column(String, nullable=True)  # e.g., 'sedentary', 'active'
    target_calories = Column(Integer, nullable=True)  # daily calorie goal
    gender = Column(String, nullable=True)
    dietary_plan = Column(String, nullable=True)
    dietary_preferences = Column(String, nullable=True)
    allergies = Column(String, default="",nullable=True)

    meals = relationship("Meal", back_populates="user")
    scanned_foods = relationship("ScannedFood", back_populates="user")
    favorite_foods = relationship("FavoriteFood", back_populates="user")

class FoodItem(Base):
    __tablename__ = "food_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    calories_per_serving = Column(Float)
    serving_size = Column(Float)  # in grams or ml
    category = Column(String)  
    meal_items = relationship("MealItem", back_populates="food_item")

# Meal model
class Meal(Base):
    __tablename__ = "meals"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    total_calories = Column(Float,nullable=True)
    total_protein = Column(Float, nullable=True)
    total_carbs = Column(Float, nullable=True)
    total_fat = Column(Float, nullable=True)
    user = relationship("User", back_populates="meals")
    items = relationship("MealItem", back_populates="meal",cascade="all, delete-orphan")  

# MealItem model
class MealItem(Base):
    __tablename__ = "meal_items"
    id = Column(Integer, primary_key=True, index=True)
    meal_id = Column(Integer, ForeignKey("meals.id"))
    food_item_id = Column(Integer, ForeignKey("food_items.id"),nullable=True)
    food_name = Column(String, nullable=False)
    quantity = Column(Float, nullable=True)  # e.g., grams
    calories = Column(Float, nullable=True)
    protein = Column(Float, nullable=True)   # <-- Add this
    carbs = Column(Float, nullable=True)     # <-- Add this
    fat = Column(Float, nullable=True)    
    meal = relationship("Meal", back_populates="items")  # <--- THIS LINE
    food_item = relationship("FoodItem")
    
    
    User.meals = relationship("Meal", back_populates="user", cascade="all, delete-orphan")

class FavoriteFood(Base):
    __tablename__ = "favorite_foods"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_item_id = Column(Integer, ForeignKey("food_items.id"))

    __table_args__ = (UniqueConstraint('user_id', 'food_item_id', name='_user_food_uc'),)
    user = relationship("User", back_populates="favorite_foods")


class ScannedFood(Base):
    __tablename__ = "scanned_foods"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_name = Column(String, index=True)
    calories = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="scanned_foods")

class Config:
    from_attributes = True 