from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate
from app.schemas.expense import ExpenseUpdate


def create_expense(db: Session, expense_data: ExpenseCreate):
    expense = Expense(
        title=expense_data.title,
        amount=expense_data.amount,
        category=expense_data.category,

        # BUSINESS ANALYTICS FIELDS

        department=expense_data.department,
        vendor=expense_data.vendor,
        expense_type=expense_data.expense_type,
        payment_method=expense_data.payment_method,
        gst_amount=expense_data.gst_amount,
        invoice_id=expense_data.invoice_id,

        expense_date=expense_data.expense_date
    )

    db.add(expense)
    db.commit()
    db.refresh(expense)

    return expense


def get_all_expenses(db: Session):
    return db.query(Expense).all()


def get_expense_by_id(db: Session, expense_id: int):
    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

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

    # BUSINESS ANALYTICS FIELDS

    expense.department = expense_data.department
    expense.vendor = expense_data.vendor
    expense.expense_type = expense_data.expense_type
    expense.payment_method = expense_data.payment_method
    expense.gst_amount = expense_data.gst_amount
    expense.invoice_id = expense_data.invoice_id

    expense.expense_date = expense_data.expense_date

    db.commit()
    db.refresh(expense)

    return expense


def delete_expense(db: Session, expense_id: int):
    expense = get_expense_by_id(db, expense_id)

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}
