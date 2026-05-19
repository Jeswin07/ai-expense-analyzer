from collections import Counter
from collections import defaultdict
from datetime import timedelta
from statistics import mean

from sqlalchemy.orm import Session

from app.models.expense import Expense


def get_expenses(db: Session):
    return db.query(Expense).all()


def calculate_total_spending(expenses):
    return sum(expense.amount for expense in expenses)


def calculate_category_totals(expenses):
    category_totals = defaultdict(float)

    for expense in expenses:
        category_totals[
            expense.category
        ] += expense.amount

    return category_totals


def calculate_top_category(
    category_totals,
    total_spending
):
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

    return (
        top_category,
        top_category_percentage
    )


def calculate_average_daily_spending(
    expenses,
    total_spending
):
    unique_days = {
        expense.expense_date
        for expense in expenses
    }

    return round(
        total_spending / len(unique_days),
        2
    )


def get_largest_expense(expenses):
    return max(
        expenses,
        key=lambda expense: expense.amount
    ).title


def calculate_weekend_spending_percentage(
    expenses,
    total_spending
):
    weekend_spending = sum(
        expense.amount
        for expense in expenses
        if expense.expense_date.weekday() >= 5
    )

    return round(
        (
            weekend_spending
            / total_spending
        ) * 100,
        2
    )


def detect_spending_spike(expenses):
    amounts = [
        expense.amount
        for expense in expenses
    ]

    average_expense = mean(amounts)

    return any(
        amount > average_expense * 2
        for amount in amounts
    )


def calculate_monthly_spending_change(
    expenses
):
    latest_date = max(
        expense.expense_date
        for expense in expenses
    )

    current_month_start = latest_date.replace(
        day=1
    )

    previous_month_end = (
        current_month_start
        - timedelta(days=1)
    )

    previous_month_start = (
        previous_month_end.replace(day=1)
    )

    current_month_spending = sum(
        expense.amount
        for expense in expenses
        if expense.expense_date
        >= current_month_start
    )

    previous_month_spending = sum(
        expense.amount
        for expense in expenses
        if previous_month_start
        <= expense.expense_date
        <= previous_month_end
    )

    if previous_month_spending == 0:
        return 0

    return round(
        (
            (
                current_month_spending
                - previous_month_spending
            )
            / previous_month_spending
        ) * 100,
        2
    )


def detect_recurring_expenses(expenses):
    title_counter = Counter(
        expense.title.lower()
        for expense in expenses
    )

    return [
        title
        for title, count
        in title_counter.items()
        if count >= 3
    ]


def calculate_budget_warning(
    top_category_percentage
):
    return top_category_percentage > 40


def calculate_financial_health_score(
    spending_spike_detected,
    weekend_spending_percentage,
    budget_warning,
    monthly_spending_change_percentage
):
    financial_health_score = 100

    if spending_spike_detected:
        financial_health_score -= 15

    if weekend_spending_percentage > 50:
        financial_health_score -= 10

    if budget_warning:
        financial_health_score -= 15

    if monthly_spending_change_percentage > 20:
        financial_health_score -= 10

    return max(financial_health_score, 0)


def generate_insight(
    top_category,
    top_category_percentage,
    spending_spike_detected,
    weekend_spending_percentage,
    monthly_spending_change_percentage,
    recurring_expenses
):
    insights = []

    insights.append(
        f"{top_category} accounts for "
        f"{top_category_percentage}% "
        f"of your spending."
    )

    if spending_spike_detected:
        insights.append(
            "Large spending spikes detected."
        )

    if weekend_spending_percentage > 50:
        insights.append(
            "Weekend spending is unusually high."
        )

    if monthly_spending_change_percentage > 20:
        insights.append(
            "Monthly spending increased significantly."
        )

    if recurring_expenses:
        insights.append(
            "Recurring spending patterns identified."
        )

    return " ".join(insights)


def generate_empty_analytics():
    return {
        "total_spending": 0,
        "total_expenses": 0,
        "top_category": "None",
        "top_category_percentage": 0,
        "average_daily_spending": 0,
        "largest_expense": "None",
        "weekend_spending_percentage": 0,
        "spending_spike_detected": False,
        "monthly_spending_change_percentage": 0,
        "recurring_expenses": [],
        "budget_warning": False,
        "financial_health_score": 100,
        "insight": (
            "No expense data available."
        )
    }


def generate_expense_analytics(
    db: Session
):
    expenses = get_expenses(db)

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

            "monthly_spending_change_percentage": 0,

            "recurring_expenses": [],

            "budget_warning": False,

            "financial_health_score": 100,

            "insight":
                "No expense data available.",

            "category_breakdown": {},

            "weekly_trend": []
        }

    total_spending = calculate_total_spending(
        expenses
    )

    total_expenses = len(expenses)

    category_totals = calculate_category_totals(
        expenses
    )

    (
        top_category,
        top_category_percentage
    ) = calculate_top_category(
        category_totals,
        total_spending
    )

    average_daily_spending = (
        calculate_average_daily_spending(
            expenses,
            total_spending
        )
    )

    largest_expense = get_largest_expense(
        expenses
    )

    weekend_spending_percentage = (
        calculate_weekend_spending_percentage(
            expenses,
            total_spending
        )
    )

    spending_spike_detected = (
        detect_spending_spike(expenses)
    )

    monthly_spending_change_percentage = (
        calculate_monthly_spending_change(
            expenses
        )
    )

    recurring_expenses = (
        detect_recurring_expenses(
            expenses
        )
    )

    budget_warning = (
        calculate_budget_warning(
            top_category_percentage
        )
    )

    financial_health_score = (
        calculate_financial_health_score(
            spending_spike_detected,
            weekend_spending_percentage,
            budget_warning,
            monthly_spending_change_percentage
        )
    )

    insight = generate_insight(
        top_category,
        top_category_percentage,
        spending_spike_detected,
        weekend_spending_percentage,
        monthly_spending_change_percentage,
        recurring_expenses
    )

    category_breakdown = {
        category: round(amount, 2)
        for category, amount
        in category_totals.items()
    }

    weekly_totals = defaultdict(float)

    for expense in expenses:
        week_number = (
            expense.expense_date.isocalendar()[1]
        )

        weekly_totals[
            f"Week {week_number}"
        ] += float(expense.amount)

    weekly_trend = [
        {
            "week": week,
            "amount": round(amount, 2)
        }
        for week, amount
        in weekly_totals.items()
    ]

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
        "monthly_spending_change_percentage":
            monthly_spending_change_percentage,
        "recurring_expenses":
            recurring_expenses,
        "budget_warning":
            budget_warning,
        "financial_health_score":
            financial_health_score,
        "insight":
            insight,
        "category_breakdown": category_breakdown,
        "weekly_trend": weekly_trend,
    }
