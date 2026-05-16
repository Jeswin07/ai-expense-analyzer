from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.expense import ExpenseCreate
from app.schemas.expense import ExpenseResponse
from app.services.expense_service import create_expense
from app.services.expense_service import get_all_expenses

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.post("/", response_model=ExpenseResponse)
def create_new_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    return create_expense(db, expense)


@router.get("/", response_model=list[ExpenseResponse])
def read_expenses(
    db: Session = Depends(get_db)
):
    return get_all_expenses(db)