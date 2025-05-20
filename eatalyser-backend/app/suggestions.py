from typing import List, Dict, Any, Optional
from collections import Counter
from .models import Meal, MealItem
from .crud import get_user

def suggest_adjustments(
    db,
    user_id: int,
    meal_items: List[Dict[str, Any]],
    total_calories: float,
    target_calories: float
) -> Dict[str, Any]:
    """
    Suggests meal adjustments to help the user meet their calorie target.

    Args:
        db: Database session.
        user_id: ID of the user.
        meal_items: List of dicts with keys 'name' and 'calories'.
        total_calories: Total calories in the current meal.
        target_calories: User's calorie target for the meal.

    Returns:
        A dict with a message and a list of suggestions.
    """
  
    user = get_user(db, user_id)
    allergies = getattr(user, "allergies", []) or []

    suggestions: List[str] = []
    diff = target_calories - total_calories
    abs_diff = abs(diff)

    if abs_diff < 30:
        suggestions.append("Your meal is very close to your target. No major adjustments needed.")
    elif diff > 0:
        suggestions.append(f"Add approximately {int(diff)} kcal to reach your target.")
        foods = get_food_recommendations(db, diff, allergies)
        if not foods:
            suggestions.append("No suitable foods found to recommend for adding calories.")
        for food in foods:
            food_dict = {
                "name": food.name,
                "calories_per_serving": food.calories_per_serving,
                "serving_size": food.serving_size
            }
            portion_suggestion = suggest_portion(food_dict, diff)
            if portion_suggestion:
                suggestions.append(portion_suggestion)
    else:
        suggestions.append(f"Reduce your meal by approximately {int(abs_diff)} kcal to meet your target.")
        if meal_items:
            try:
                highest = max(meal_items, key=lambda x: x.get('calories', 0))
                if highest.get('name'):
                    suggestions.append(f"Reduce portion of {highest['name']}.")
            except (ValueError, KeyError, TypeError):
                suggestions.append("Unable to determine which item to reduce. Please review your meal items.")
        else:
            suggestions.append("No meal items found to suggest reductions.")

    suggestions.append("Aim for a balanced meal with protein, fiber, and healthy fats.")
    return {
        "message": "Meal adjustment suggestions",
        "suggestions": suggestions
    }

def get_favorite_foods(
    db,
    user_id: int,
    exclude_names: Optional[List[str]] = None,
    top_n: int = 5
) -> List[str]:
    """
    Returns the user's most frequently eaten foods, excluding any in exclude_names.

    Args:
        db: Database session.
        user_id: ID of the user.
        exclude_names: List of food names to exclude.
        top_n: Number of top foods to return.

    Returns:
        List of food names.
    """

    exclude_names = set(exclude_names or [])
    meals = db.query(Meal).filter(Meal.user_id == user_id).all()
    food_counter = Counter()
    for meal in meals:
        for item in getattr(meal, "items", []):
            if item.food_name not in exclude_names:
                food_counter[item.food_name] += 1
    return [name for name, _ in food_counter.most_common(top_n)]

def filter_allergies(
    food_list: List[Dict[str, Any]],
    allergies: List[str]
) -> List[Dict[str, Any]]:
    """
    Filters out foods the user is allergic to.

    Args:
        food_list: List of food dicts with 'name' key.
        allergies: List of allergy names.

    Returns:
        Filtered list of food dicts.
    """
    allergies_set = set(a.lower() for a in allergies)
    return [food for food in food_list if food['name'].lower() not in allergies_set]

def suggest_portion(
    food: Dict[str, Any],
    calorie_gap: float
) -> Optional[str]:
    """
    Suggests a portion size of a food to fill a calorie gap.

    Args:
        food: Dict with 'name', 'calories_per_serving', 'serving_size'.
        calorie_gap: Number of kcal to fill.

    Returns:
        Suggestion string or None if not applicable.
    """
    if food['calories_per_serving'] <= 0:
        return None  # Avoid division by zero

    servings_needed = calorie_gap / food['calories_per_serving']
    if servings_needed < 0.25:
        return None  # Too small to suggest

    servings_needed = round(servings_needed, 1)
    portion_grams = round(servings_needed * food['serving_size'])

    if servings_needed < 1:
        portion_str = f"{servings_needed} serving ({portion_grams}g)"
    else:
        portion_str = f"{servings_needed} servings ({portion_grams}g)"

    return f"Add {portion_str} of {food['name']}."

def get_food_recommendations(
    db,
    calorie_gap: float,
    allergies: List[str],
    top_n: int = 3,
    category: Optional[str] = None
):
    """
    Recommends foods to fill a calorie gap, avoiding allergies.

    Args:
        db: Database session.
        calorie_gap: Number of kcal to fill.
        allergies: List of allergy names.
        top_n: Number of foods to recommend.
        category: Optional food category to filter by.

    Returns:
        List of FoodItem objects.
    """
    from .models import FoodItem
    query = db.query(FoodItem)
    if category:
        query = query.filter(FoodItem.category == category)
    foods = query.all()
    # Filter out allergies
    foods = [f for f in foods if f.name.lower() not in (a.lower() for a in allergies)]
    # Sort by how close their calories per serving are to the gap
    foods.sort(key=lambda f: abs(f.calories_per_serving - calorie_gap))
    return foods[:top_n]