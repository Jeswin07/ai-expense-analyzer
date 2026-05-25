from collections import defaultdict

import pandas as pd

from prophet import Prophet

from sqlalchemy.orm import Session

from app.models.expense import Expense


def forecast_expenses(
    db: Session
):

    expenses = (
        db.query(Expense).all()
    )

    # Need sufficient data

    if len(expenses) < 10:

        return {

            "forecast": [],

            "message":
                (
                    "Not enough historical "
                    "expense data available "
                    "for forecasting."
                )
        }

    # =====================================
    # MONTHLY AGGREGATION
    # =====================================

    # Monthly forecasting is MUCH more
    # realistic for operational business
    # analytics than daily forecasting.

    monthly_totals = defaultdict(float)

    for expense in expenses:

        month_key = (
            expense.expense_date
            .strftime("%Y-%m")
        )

        monthly_totals[
            month_key
        ] += expense.amount

    # =====================================
    # SORT TIME SERIES PROPERLY
    # =====================================

    sorted_items = sorted(
        monthly_totals.items()
    )

    # =====================================
    # BUILD PROPHET DATAFRAME
    # =====================================

    df = pd.DataFrame({

        "ds": [

            f"{item[0]}-01"

            for item in sorted_items
        ],

        "y": [

            item[1]

            for item in sorted_items
        ]
    })

    df["ds"] = pd.to_datetime(
        df["ds"]
    )

    # Final chronological safety

    df = df.sort_values("ds")

    # =====================================
    # PROPHET MODEL
    # =====================================

    # Conservative business forecasting

    model = Prophet(

        yearly_seasonality=True,

        weekly_seasonality=False,

        daily_seasonality=False,

        changepoint_prior_scale=0.08,

        seasonality_prior_scale=5.0
    )

    model.fit(df)

    # =====================================
    # FUTURE FORECAST
    # =====================================

    # Predict next 6 months

    future = model.make_future_dataframe(

        periods=6,

        freq='MS'
    )

    forecast = model.predict(
        future
    )

    # Only future rows

    future_forecast = forecast.tail(6)

    # =====================================
    # FORMAT RESULTS
    # =====================================

    forecast_results = []

    for _, row in future_forecast.iterrows():

        predicted_value = max(
            0,
            round(
                float(row["yhat"]),
                2
            )
        )

        lower_bound = max(
            0,
            round(
                float(row["yhat_lower"]),
                2
            )
        )

        upper_bound = max(
            0,
            round(
                float(row["yhat_upper"]),
                2
            )
        )

        forecast_results.append({

            "date":

                row["ds"].strftime(
                    "%b %Y"
                ),

            "predicted_expense":
                predicted_value,

            "lower_bound":
                lower_bound,

            "upper_bound":
                upper_bound
        })

    # =====================================
    # HISTORICAL DATA
    # =====================================

    historical_data = []

    for month, amount in sorted_items:

        historical_data.append({

            "date":

                pd.to_datetime(
                    f"{month}-01"
                ).strftime("%b %Y"),

            "expense":
                round(amount, 2)
        })

    # =====================================
    # AI BUSINESS INSIGHT
    # =====================================

    avg_forecast = (

        sum(
            item["predicted_expense"]

            for item in forecast_results
        )

        / len(forecast_results)
    )

    trend_direction = (

        "increase"

        if forecast_results[-1][
            "predicted_expense"
        ] >

        historical_data[-1][
            "expense"
        ]

        else "decrease"
    )

    insight = (

        f"Operational expenses are "
        f"projected to show a "
        f"{trend_direction} trend "
        f"with an estimated average "
        f"monthly expenditure of "
        f"₹{avg_forecast:,.0f}."
    )

    # =====================================
    # FINAL RESPONSE
    # =====================================

    return {

        "historical_data":
            historical_data,

        "forecast":
            forecast_results,

        "insight":
            insight
    }