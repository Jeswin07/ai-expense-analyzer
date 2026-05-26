from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.expense import ExpenseCreate
from app.schemas.expense import ExpenseResponse
from app.services.expense_service import create_expense
from app.services.expense_service import get_all_expenses
from app.schemas.expense import ExpenseUpdate
from app.services.expense_service import delete_expense
from app.services.expense_service import get_expense_by_id
from app.services.expense_service import update_expense
from app.core.dependencies import (
    get_current_user
)

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.post("/", response_model=ExpenseResponse)
def create_new_expense(

    expense: ExpenseCreate,

    current_user = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):
    return create_expense(
        db, expense, current_user.id
        )


@router.get("/", response_model=list[ExpenseResponse])
def read_expenses(
    db: Session = Depends(get_db)
):
    return get_all_expenses(db)


@router.get("/{expense_id}", response_model=ExpenseResponse)
def read_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    return get_expense_by_id(db, expense_id)


@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_existing_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    db: Session = Depends(get_db)
):
    return update_expense(db, expense_id, expense)


@router.delete("/{expense_id}")
def delete_existing_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    return delete_expense(db, expense_id)
