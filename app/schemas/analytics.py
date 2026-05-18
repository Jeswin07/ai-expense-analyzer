from pydantic import BaseModel


class ExpenseAnalyticsResponse(BaseModel):
    total_spending: float

    total_expenses: int

    top_category: str

    top_category_percentage: float

    average_daily_spending: float

    largest_expense: str

    weekend_spending_percentage: float

    spending_spike_detected: bool

    insight: str
