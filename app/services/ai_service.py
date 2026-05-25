import json
import re

from datetime import date

from openai import OpenAI

from app.core.config import settings


# ─────────────────────────────────────
# CLIENT INITIALIZATION
# ─────────────────────────────────────

def get_client():

    if not settings.groq_api_key:

        return None

    return OpenAI(

        api_key=settings.groq_api_key,

        base_url=
            "https://api.groq.com/openai/v1"
    )


# ─────────────────────────────────────
# GENERIC AI RESPONSE
# ─────────────────────────────────────

def generate_ai_response(
    prompt: str
) -> str:

    client = get_client()

    if client is None:

        return (
            "AI service unavailable."
        )

    response = (

        client.chat.completions.create(

            model=
                "llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",

                    "content":
                        (
                            "You are a senior "
                            "enterprise business "
                            "intelligence analyst "
                            "specializing in "
                            "financial operations, "
                            "predictive analytics, "
                            "vendor optimization, "
                            "and operational risk "
                            "analysis."
                        )
                },

                {
                    "role": "user",

                    "content": prompt
                }
            ],

            temperature=0.25,
        )
    )

    return (

        response
        .choices[0]
        .message
        .content
        .strip()
    )


# ─────────────────────────────────────
# AI BUSINESS INSIGHTS
# ─────────────────────────────────────

def generate_ai_business_insights(

    analytics_data: dict,

    forecasting_data: dict,

    vendor_data: list,

    anomaly_data: list
):

    # =================================
    # TOP VENDORS
    # =================================

    top_vendors = sorted(

        vendor_data,

        key=lambda item:
            item["total_spend"],

        reverse=True

    )[:5]

    vendor_summary = [

        (
            f'{item["vendor"]}'
            f' (₹{item["total_spend"]:,.0f})'
        )

        for item in top_vendors
    ]

    # =================================
    # FORECAST SUMMARY
    # =================================

    forecast_summary = forecasting_data.get(

        "insight",

        "No forecasting insight available."
    )

    # =================================
    # ANOMALY SUMMARY
    # =================================

    anomaly_count = len(
        anomaly_data
    )

    high_risk_count = len([

        item

        for item in anomaly_data

        if abs(item.get(
            "z_score",
            0
        )) > 3
    ])

    # =================================
    # CATEGORY BREAKDOWN
    # =================================

    category_breakdown = analytics_data.get(
        "category_breakdown",
        {}
    )

    top_categories = sorted(

        category_breakdown.items(),

        key=lambda item:
            item[1],

        reverse=True
    )[:3]

    category_summary = [

        (
            f"{category}"
            f" (₹{amount:,.0f})"
        )

        for category, amount in top_categories
    ]

    # =================================
    # BUILD EXECUTIVE PROMPT
    # =================================

    prompt = f"""
You are a senior enterprise business intelligence consultant.

Analyze the following operational financial data and generate executive-level business intelligence insights.

━━━━━━━━━━━━━━━━━━
ENTERPRISE ANALYTICS
━━━━━━━━━━━━━━━━━━

Total Operational Spending:
₹{analytics_data["total_spending"]:,.0f}

Total Expense Records:
{analytics_data["total_expenses"]}

Top Spending Categories:
{category_summary}

Top Operational Category:
{analytics_data["top_category"]}

Top Category Contribution:
{analytics_data["top_category_percentage"]}%

Average Daily Operational Spend:
₹{analytics_data["average_daily_spending"]:,.0f}

Monthly Spending Trend:
{analytics_data["monthly_spending_change_percentage"]}%

Recurring Operational Expenses:
{analytics_data["recurring_expenses"]}

Financial Health Score:
{analytics_data["financial_health_score"]}/100

━━━━━━━━━━━━━━━━━━
FORECASTING
━━━━━━━━━━━━━━━━━━

{forecast_summary}

━━━━━━━━━━━━━━━━━━
VENDOR INTELLIGENCE
━━━━━━━━━━━━━━━━━━

Top Vendors:
{vendor_summary}

━━━━━━━━━━━━━━━━━━
ANOMALY DETECTION
━━━━━━━━━━━━━━━━━━

Detected Operational Anomalies:
{anomaly_count}

High Risk Operational Events:
{high_risk_count}

━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT
━━━━━━━━━━━━━━━━━━

Generate the response using EXACTLY these sections:

## Executive Summary

## Operational Spending Analysis

## Forecast & Trend Analysis

## Vendor Intelligence

## Risk Assessment

## Strategic Recommendations

Requirements:
- Executive business tone
- Concise but insightful
- Mention operational efficiency
- Mention optimization opportunities
- Mention vendor concentration risk
- Mention forecast direction
- Mention anomaly implications
- Mention cost management recommendations
- Use clear business language
- Maximum 450 words
"""

    try:

        return generate_ai_response(
            prompt
        )

    except (

        json.JSONDecodeError,

        ValueError,

        TypeError,

        KeyError

    ) as error:

        print(error)

        return (
            "AI business insights temporarily unavailable."
        )


# ─────────────────────────────────────
# NLP EXPENSE EXTRACTION
# ─────────────────────────────────────

def extract_expense_from_text(
    text: str
):

    prompt = f"""
Extract operational expense data from this business text.

Text:
{text}

Return ONLY valid JSON.

Format:
{{
  "title": "AWS EC2 Billing",
  "amount": 12000,
  "category": "Cloud Infrastructure",
  "expense_date": "{date.today().isoformat()}"
}}

Rules:
- Return only JSON
- Use double quotes
- No markdown
- No explanation
- Use today's date if missing
- Use business-oriented categories
"""

    try:

        extracted_text = (
            generate_ai_response(prompt)
        )

        cleaned_text = (
            extracted_text
            .strip()
        )

        cleaned_text = re.sub(

            r"```json|```",

            "",

            cleaned_text
        ).strip()

        json_match = re.search(

            r"\{.*\}",

            cleaned_text,

            re.DOTALL
        )

        if not json_match:

            raise ValueError(
                "No valid JSON found."
            )

        parsed_json = json.loads(
            json_match.group()
        )

        required_fields = [

            "title",

            "amount",

            "category",

            "expense_date"
        ]

        for field in required_fields:

            if field not in parsed_json:

                raise ValueError(
                    f"Missing field: {field}"
                )

        parsed_json["amount"] = float(
            parsed_json["amount"]
        )

        return parsed_json

    except (

        json.JSONDecodeError,

        ValueError,

        TypeError,

        KeyError

    ) as error:

        print(error)

        return {

            "title":
                "Unknown Expense",

            "amount":
                0,

            "category":
                "Operations",

            "expense_date":
                date.today().isoformat()
        }
