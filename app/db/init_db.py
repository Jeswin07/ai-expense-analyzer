from app.db.database import Base
from app.db.database import engine
from app.models.expense import Expense


def create_tables():
    Base.metadata.create_all(bind=engine)