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

    monthly_spending_change_percentage: float

    recurring_expenses: list[str]

    budget_warning: bool

    financial_health_score: int

    insight: str

    category_breakdown: dict

    weekly_trend: list[dict]
