from pydantic import BaseModel


class ExpenseAnalyticsResponse(BaseModel):
    total_spending: float
    total_expenses: int
    top_category: str
    insight: str
