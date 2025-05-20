
# from sqlalchemy.orm import Session
# from . import models, schemas, auth

# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()
# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()
# def create_user(db: Session, user: schemas.UserCreate):
#     hashed_password = auth.get_password_hash(user.password)
#     db_user = models.User(
#         email=user.email,
#         hashed_password=hashed_password,
#         full_name=user.full_name,
#         age=user.age,
#         weight=user.weight,
#         height=user.height,
#         activity_level=user.activity_level,
#         target_calories=target_calories,
#         dietary_preferences=user.dietary_preferences,
#     )
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user