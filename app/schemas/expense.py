from pydantic import BaseModel


class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: str


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(ExpenseBase):
    pass


class ExpenseResponse(ExpenseBase):
    id: int

    class Config:
        from_attributes = True
