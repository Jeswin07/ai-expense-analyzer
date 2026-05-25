from datetime import date
from random import choice
from random import randint
from random import uniform

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.expense import Expense


db: Session = SessionLocal()

departments = [
    "IT",
    "Marketing",
    "Operations",
    "Finance",
    "HR",
    "Sales"
]

categories = [
    "Cloud Infrastructure",
    "Marketing",
    "Software",
    "Operations",
    "Travel",
    "Payroll",
    "Utilities",
    "Procurement"
]

vendors = [
    "AWS India",
    "Google Cloud India",
    "Azure India",
    "Meta Ads",
    "Google Ads",
    "Razorpay",
    "Jio Business",
    "Airtel Business",
    "Swiggy Corporate",
    "Zomato Business",
    "Flipkart Business",
    "Tata Communications",
    "Slack",
    "Notion",
    "Zoho",
    "Freshworks"
]

payment_methods = [
    "UPI",
    "Corporate Card",
    "Bank Transfer"
]

expense_types = [
    "Operational",
    "Infrastructure",
    "Subscription",
    "Advertising",
    "Utilities",
    "Procurement"
]

titles = [
    "Cloud Server Billing",
    "Marketing Campaign",
    "Software Subscription",
    "Internet Services",
    "Office Procurement",
    "Business Travel",
    "Payroll Processing",
    "Operational Expense",
    "Employee Reimbursement",
    "Data Storage Charges"
]

# Generate 120 expenses

for _ in range(120):

    category = choice(categories)

    amount = round(
        uniform(1500, 85000),
        2
    )

    # Introduce anomalies

    if randint(1, 20) == 1:
        amount *= 4

    expense = Expense(

        title=choice(titles),

        amount=amount,

        category=category,

        department=choice(departments),

        vendor=choice(vendors),

        expense_type=choice(expense_types),

        payment_method=choice(
            payment_methods
        ),

        gst_amount=round(
            amount * 0.18,
            2
        ),

        invoice_id=f"INV-{randint(1000,9999)}",

        expense_date=date(
            2026,
            randint(1, 5),
            randint(1, 28)
        )
    )

    db.add(expense)

db.commit()

print(
    "Business expense data seeded successfully."
)