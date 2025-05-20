from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr , Field
from typing import Any, Dict


class FoodItemBase(BaseModel):
    name: str
    calories: Optional[float] = 0.0
    protein: Optional[float] = 0.0
    carbs: Optional[float] = 0.0
    fat: Optional[float] = 0.0
    calories_per_serving: float
    serving_size: float
    category: str

class FoodItemCreate(FoodItemBase):
    pass
class FoodNamesRequest(BaseModel):
    food_names: List[str]
class FoodItem(FoodItemBase):
    id: int
    class Config:
        from_attributes = True

class MealItemBase(BaseModel):
    food_name: str
    quantity: float
    calories: float
    protein: float
    carbs: float
    fat: float

class MealItemCreate(MealItemBase):
    pass

class MealItemOut(MealItemBase):
    id: int
    class Config:
        from_attributes = True

class MealBase(BaseModel):
    timestamp: Optional[datetime] = None

class MealCreate(MealBase):
    items: List[MealItemCreate]
    food_items: List[FoodItem]

class MealOut(MealBase):
    id: int
    total_calories: float
    total_protein: float
    total_carbs: float
    total_fat: float
    items: List[MealItemOut]
    class Config:
        from_attributes = True
class MealWithSuggestions(MealOut):
    target_calories: float
    suggestions: List[str]
class MealLogResponse(MealOut):
    target_calories: float
    suggestions: Dict[str, Any]
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    activity_level: Optional[str] = None
    gender: str 
    dietary_plan: str  # e.g., "weight_loss", "weight_gain", "maintenance", "gym"
    dietary_preferences: Optional[str] = None
    allergies: Optional[List[str]] = Field(default_factory=list)


class SuggestionRequest(BaseModel):
    meal_items: List[Dict]  # Each dict: {"name": str, "calories": float, ...}
    total_calories: float
    target_calories: float
class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(UserBase):
    id: int
    target_calories: int

    class Config:
        from_attributes = True

class ScannedFoodBase(BaseModel):
    food_name: str
    calories: float

class ScannedFoodCreate(ScannedFoodBase):
    pass

class ScannedFood(ScannedFoodBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class FavoriteFoodBase(BaseModel):
    food_item_id: int

class FavoriteFoodCreate(FavoriteFoodBase):
    pass

class FavoriteFood(FavoriteFoodBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True