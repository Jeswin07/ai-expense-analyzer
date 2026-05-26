from io import StringIO

import pandas as pd

from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.expense import Expense

from app.core.dependencies import (
    get_current_user
)


router = APIRouter(

    prefix="/csv-import",

    tags=["CSV Import"]
)


@router.post("/")
async def import_expenses_csv(

    current_user = Depends(
        get_current_user
    ),

    file: UploadFile = File(...),

    db: Session = Depends(get_db)
):

    # ─────────────────────────────
    # VALIDATE FILE
    # ─────────────────────────────

    if not file.filename.endswith(".csv"):

        return {

            "error":
                "Only CSV files are supported."
        }

    # ─────────────────────────────
    # READ CSV
    # ─────────────────────────────

    contents = await file.read()

    csv_data = StringIO(

        contents.decode("utf-8")
    )

    df = pd.read_csv(
        csv_data
    )

    # ─────────────────────────────
    # REQUIRED COLUMNS
    # ─────────────────────────────

    required_columns = [

        "title",

        "amount",

        "category",

        "department",

        "vendor",

        "expense_type",

        "payment_method",

        "gst_amount",

        "invoice_id",

        "expense_date"
    ]

    missing_columns = [

        column

        for column in required_columns

        if column not in df.columns
    ]

    if missing_columns:

        return {

            "error":
                "Missing columns.",

            "missing":
                missing_columns
        }

    inserted_count = 0

    # ─────────────────────────────
    # INSERT ROWS
    # ─────────────────────────────

    for _, row in df.iterrows():

        expense = Expense(

            user_id=current_user.id,

            title=row["title"],

            amount=float(
                row["amount"]
            ),

            category=row["category"],

            department=row["department"],

            vendor=row["vendor"],

            expense_type=row[
                "expense_type"
            ],

            payment_method=row[
                "payment_method"
            ],

            gst_amount=float(
                row["gst_amount"]
            ),

            invoice_id=row[
                "invoice_id"
            ],

            expense_date=pd.to_datetime(
                row["expense_date"]
            ).date()
        )

        db.add(expense)

        inserted_count += 1

    db.commit()

    return {

        "message":
            "CSV imported successfully.",

        "rows_inserted":
            inserted_count
    }
