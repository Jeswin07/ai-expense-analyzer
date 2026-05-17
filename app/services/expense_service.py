from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate
from app.schemas.expense import ExpenseUpdate

from fastapi import HTTPException


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


def get_expense_by_id(db: Session, expense_id: int):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return expense


def update_expense(
    db: Session,
    expense_id: int,
    expense_data: ExpenseUpdate
):
    expense = get_expense_by_id(db, expense_id)

    expense.title = expense_data.title
    expense.amount = expense_data.amount
    expense.category = expense_data.category

    db.commit()
    db.refresh(expense)

    return expense


def delete_expense(db: Session, expense_id: int):
    expense = get_expense_by_id(db, expense_id)

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}