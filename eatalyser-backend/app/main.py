from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud
from .database import SessionLocal, engine
from fastapi import File, UploadFile
import shutil
from datetime import datetime, date
import os
from fastapi import Form
from .image_recognition import recognize_food
from pydantic import BaseModel
from typing import List
from .nutrition import get_nutrition_info
from .suggestions import suggest_adjustments
from typing import List, Dict
from fastapi import UploadFile, File, Form
from .image_recognition import recognize_food
from .nutrition import get_nutrition_info
from .suggestions import suggest_adjustments
from .crud import get_user
import shutil
import os
from .schemas import SuggestionRequest
from .schemas import FoodNamesRequest
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from . import schemas, users, auth, database
from jose import JWTError
from fastapi import Security
from .schemas import MealCreate, MealOut


models.Base.metadata.create_all(bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = auth.decode_access_token(token)
    if payload is None:
        raise credentials_exception
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    user = crud.get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    return user

@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@app.get("/users/{user_id}", response_model=schemas.UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/food_items/", response_model=schemas.FoodItem)
def create_food_item(food: schemas.FoodItemCreate, db: Session = Depends(get_db)):
    return crud.create_food_item(db, food)

@app.get("/food_items/", response_model=list[schemas.FoodItem])
def read_food_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_food_items(db, skip=skip, limit=limit)


@app.post("/meals/", response_model=schemas.MealLogResponse)
def log_meal(
    meal: schemas.MealCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_meal = crud.create_meal(db, user_id=current_user.id, meal=meal)
    meal_items = [
        {"name": item.food_name, "calories": item.calories}
        for item in db_meal.items
    ]
    total_calories = db_meal.total_calories
    target_calories = current_user.target_calories
    suggestions = suggest_adjustments(db, current_user.id, meal_items, total_calories, target_calories)
    return {
        **schemas.MealOut.from_orm(db_meal).dict(),
        "target_calories": target_calories,
        "suggestions": suggestions
    }

@app.get("/meals/", response_model=List[schemas.MealOut])
def get_meal_history(skip: int = 0, limit: int = 10, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_meals_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
@app.get("/meals/{meal_id}/suggestions")
def get_meal_suggestions(
    meal_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_meal = crud.get_meal(db, meal_id)
    if not db_meal or db_meal.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Meal not found")
    meal_items = [
        {"name": item.food_name, "calories": item.calories}
        for item in db_meal.items
    ]
    total_calories = db_meal.total_calories
    target_calories = current_user.target_calories
    suggestions = suggest_adjustments(meal_items, total_calories, target_calories)
    return {
        "meal_id": meal_id,
        "total_calories": total_calories,
        "target_calories": target_calories,
        "suggestions": suggestions
    }
@app.get("/meals/{meal_id}", response_model=schemas.MealOut)
def read_meal(meal_id: int, db: Session = Depends(get_db)):
    db_meal = crud.get_meal(db, meal_id)
    if db_meal is None:
        raise HTTPException(status_code=404, detail="Meal not found")
    return db_meal


@app.post("/meals/", response_model=schemas.MealLogResponse)
def log_meal(
    meal: schemas.MealCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_meal = crud.create_meal(db, user_id=current_user.id, meal=meal)
    
    # Log each food item in scanned_foods
    for item in meal.food_items:
        crud.log_scanned_food(db, current_user.id, item.name, item.calories)
    
    meal_items = [
        {"name": item.food_name, "calories": item.calories}
        for item in db_meal.items
    ]
    total_calories = db_meal.total_calories
    target_calories = current_user.target_calories
    suggestions = suggest_adjustments(db, current_user.id, meal_items, total_calories, target_calories)
    return {
        **schemas.MealOut.from_orm(db_meal).dict(),
        "target_calories": target_calories,
        "suggestions": suggestions
    }

@app.get("/users/{user_id}/meals", response_model=list[schemas.MealOut])
def read_user_meals(user_id: int, db: Session = Depends(get_db)):
    return crud.get_meals_for_user(db, user_id)

@app.post("/recognize-food-image/")
async def recognize_food_image(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Call the recognition function
    food_names = recognize_food(temp_path)
    # Clean up
    os.remove(temp_path)
    return {"recognized_foods": food_names}



@app.post("/nutrition-info/")
def nutrition_info(request: FoodNamesRequest, db: Session = Depends(get_db)):
    return get_nutrition_info(db, request.food_names)




@app.post("/suggest-adjustments/")
def suggest_adjustments_endpoint(
    request: SuggestionRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return suggest_adjustments(
        db=db,
        user_id=current_user.id,
        meal_items=request.meal_items,
        total_calories=request.total_calories,
        target_calories=request.target_calories
    )
@app.post("/analyze-meal-image/")
async def analyze_meal_image(
    user_id: int = Form(...),
    file: UploadFile = File(...)
):
    try:
        # 1. Save the uploaded image
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 2. Recognize foods in the image
        try:
            food_names = recognize_food(temp_path)
            if not food_names:
                return {"error": "No foods were recognized in the image"}
        except Exception as e:
            print(f"Error in food recognition: {str(e)}")
            return {"error": f"Failed to recognize foods: {str(e)}"}

        # Clean up the temp file
        os.remove(temp_path)

        # 3. Get nutrition info for recognized foods
        try:
            db = next(get_db())
            nutrition_list = get_nutrition_info(db, food_names)
        except Exception as e:
            print(f"Error getting nutrition info: {str(e)}")
            return {"error": f"Failed to get nutrition information: {str(e)}"}

        # 4. Sum total calories and prepare meal_items
        meal_items = []
        total_calories = 0
        for item in nutrition_list:
            if item["calories"] is not None:
                meal_items.append({"name": item["name"], "calories": item["calories"]})
                total_calories += item["calories"]

        # 5. Get user's target calories
        try:
            user = get_user(db, user_id)
            if not user:
                return {"error": "User not found"}
            target_calories = user.target_calories
        except Exception as e:
            print(f"Error getting user info: {str(e)}")
            return {"error": f"Failed to get user information: {str(e)}"}

        # 6. Get suggestions
        try:
            suggestions = suggest_adjustments(
                db=db,
                user_id=user_id,
                meal_items=meal_items,
                total_calories=total_calories,
                target_calories=target_calories
            )
        except Exception as e:
            print(f"Error getting suggestions: {str(e)}")
            suggestions = {
                "message": "Unable to generate suggestions",
                "suggestions": ["Please check your meal and try again."]
            }

        # 7. Return all results
        return {
            "recognized_foods": food_names,
            "nutrition_info": nutrition_list,
            "total_calories": total_calories,
            "target_calories": target_calories,
            "suggestions": suggestions
        }
    except Exception as e:
        print(f"Unexpected error in analyze_meal_image: {str(e)}")
        return {"error": f"An unexpected error occurred: {str(e)}"}



@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/meals/history", response_model=List[schemas.MealOut])
def meal_history(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    return crud.get_meal_history(db, user.id)


@app.get("/scanned_foods/history", response_model=List[schemas.ScannedFood])
def scanned_foods_history(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user)
):
    return crud.get_scanned_foods(db, user.id)

@app.post("/favorite_foods/", response_model=schemas.FavoriteFood)
def add_favorite_food(
    food: schemas.FavoriteFoodCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.add_favorite_food(db, current_user.id, food.food_item_id)

@app.delete("/favorite_foods/{food_item_id}", response_model=schemas.FavoriteFood)
def remove_favorite_food(
    food_item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    favorite = crud.remove_favorite_food(db, current_user.id, food_item_id)
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return favorite

@app.get("/favorite_foods/", response_model=List[schemas.FavoriteFood])
def get_favorite_foods(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_favorite_foods(db, current_user.id)

@app.get("/macros/summary")
def macro_summary(
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    meals = db.query(models.Meal).filter(
        models.Meal.user_id == current_user.id,
        models.Meal.timestamp >= start_date,
        models.Meal.timestamp <= end_date
    ).all()
    total_protein = sum(meal.total_protein for meal in meals)
    total_carbs = sum(meal.total_carbs for meal in meals)
    total_fat = sum(meal.total_fat for meal in meals)
    return {
        "total_protein": total_protein,
        "total_carbs": total_carbs,
        "total_fat": total_fat
    }

@app.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: schemas.UserOut = Depends(get_current_user)):
    if current_user.allergies == "":
        current_user.allergies = []
    return current_user
