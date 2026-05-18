from collections import defaultdict
from statistics import mean

from app.models.expense import Expense

# pylint: disable=too-many-locals
def generate_expense_analytics(db):
    expenses = db.query(Expense).all()

    if not expenses:
        return {
            "total_spending": 0,
            "total_expenses": 0,
            "top_category": "None",
            "top_category_percentage": 0,
            "average_daily_spending": 0,
            "largest_expense": "None",
            "weekend_spending_percentage": 0,
            "spending_spike_detected": False,
            "insight": "No expense data available."
        }

    total_spending = sum(
        expense.amount for expense in expenses
    )

    total_expenses = len(expenses)

    category_totals = defaultdict(float)

    for expense in expenses:
        category_totals[
            expense.category
        ] += expense.amount

    top_category = max(
        category_totals,
        key=category_totals.get
    )

    top_category_percentage = round(
        (
            category_totals[top_category]
            / total_spending
        ) * 100,
        2
    )

    unique_days = {
        expense.expense_date
        for expense in expenses
    }

    average_daily_spending = round(
        total_spending / len(unique_days),
        2
    )

    largest_expense = max(
        expenses,
        key=lambda expense: expense.amount
    ).title

    weekend_spending = sum(
        expense.amount
        for expense in expenses
        if expense.expense_date.weekday() >= 5
    )

    weekend_spending_percentage = round(
        (weekend_spending / total_spending) * 100,
        2
    )

    amounts = [
        expense.amount for expense in expenses
    ]

    average_expense = mean(amounts)

    spending_spike_detected = any(
        amount > average_expense * 2
        for amount in amounts
    )

    insight = (
        f"{top_category} accounts for "
        f"{top_category_percentage}% "
        f"of your spending."
    )

    return {
        "total_spending": round(
            total_spending,
            2
        ),
        "total_expenses": total_expenses,
        "top_category": top_category,
        "top_category_percentage":
            top_category_percentage,
        "average_daily_spending":
            average_daily_spending,
        "largest_expense":
            largest_expense,
        "weekend_spending_percentage":
            weekend_spending_percentage,
        "spending_spike_detected":
            spending_spike_detected,
        "insight":
            insight
    }
