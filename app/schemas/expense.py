from datetime import date
from datetime import datetime

from pydantic import BaseModel


class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: str
    expense_date: date | None = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(ExpenseBase):
    pass


class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
