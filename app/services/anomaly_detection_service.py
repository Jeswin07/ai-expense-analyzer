from statistics import mean
from statistics import stdev

from sqlalchemy.orm import Session

from app.models.expense import Expense


def detect_expense_anomalies(
    db: Session
):

    expenses = (
        db.query(Expense).all()
    )

    if len(expenses) < 2:
        return []

    amounts = [
        expense.amount
        for expense in expenses
    ]

    avg = mean(amounts)

    std_dev = stdev(amounts)

    if std_dev == 0:
        return []

    anomalies = []

    for expense in expenses:

        z_score = (
            expense.amount - avg
        ) / std_dev

        if abs(z_score) > 2:

            anomalies.append({

                "title":
                    expense.title,

                "vendor":
                    expense.vendor,

                "department":
                    expense.department,

                "amount":
                    round(expense.amount, 2),

                "z_score":
                    round(z_score, 2),

                "message":
                    (
                        "Unusual operational "
                        "expense detected."
                    )
            })

    return anomalies
