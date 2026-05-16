from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate


def create_expense(db: Session, expense_data: ExpenseCreate):
    expense = Expense(
        title=expense_data.title,
        amount=expense_data.amount,
        category=expense_data.category
    )

    db.add(expense)
    db.commit()
    db.refresh(expense)

    return expense


def get_all_expenses(db: Session):
    return db.query(Expense).all()