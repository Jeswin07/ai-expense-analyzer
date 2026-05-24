from datetime import date
from datetime import datetime

from pydantic import BaseModel


class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: str

    department: str | None = None
    vendor: str | None = None
    expense_type: str | None = None
    payment_method: str | None = None
    gst_amount: float = 0
    invoice_id: str | None = None

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
