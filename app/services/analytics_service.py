from collections import Counter

from sqlalchemy.orm import Session

from app.models.expense import Expense


def generate_expense_analytics(db: Session):
    expenses = db.query(Expense).all()

    if not expenses:
        return {
            "total_spending": 0,
            "total_expenses": 0,
            "top_category": "None",
            "insight": "No expenses available for analysis."
        }

    total_spending = sum(expense.amount for expense in expenses)

    category_counts = Counter(
        expense.category for expense in expenses
    )

    top_category = category_counts.most_common(1)[0][0]

    insight = (
        f"Your highest spending category is "
        f"{top_category}."
    )

    return {
        "total_spending": round(float(total_spending),2),
        "total_expenses": len(expenses),
        "top_category": top_category,
        "insight": insight
    }
