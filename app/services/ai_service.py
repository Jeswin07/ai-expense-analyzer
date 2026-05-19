import json
import re

from datetime import date

from openai import OpenAI

from app.core.config import settings


def get_client():

    if not settings.groq_api_key:

        return None

    return OpenAI(

        api_key=settings.groq_api_key,

        base_url=
            "https://api.groq.com/openai/v1"
    )

# ─────────────────────────────────────
# GENERIC AI CHAT
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
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3,
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
# AI FINANCIAL SUMMARY
# ─────────────────────────────────────

def generate_ai_financial_summary(
    analytics_data: dict
):

    prompt = f"""
Analyze this financial profile.

Total spending:
₹{analytics_data["total_spending"]}

Total expenses:
{analytics_data["total_expenses"]}

Top category:
{analytics_data["top_category"]}

Top category percentage:
{analytics_data["top_category_percentage"]}%

Average daily spending:
₹{analytics_data["average_daily_spending"]}

Largest expense:
₹{analytics_data["largest_expense"]}

Weekend spending:
{analytics_data["weekend_spending_percentage"]}%

Monthly spending change:
{analytics_data["monthly_spending_change_percentage"]}%

Recurring expenses:
{analytics_data["recurring_expenses"]}

Budget warning:
{analytics_data["budget_warning"]}

Financial health score:
{analytics_data["financial_health_score"]}/100

Provide:
1. Spending behavior analysis
2. Risk observations
3. Budget suggestions
4. Financial discipline insights
5. Actionable recommendations

Keep response concise and practical.
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
            "AI summary temporarily unavailable."
        )


# ─────────────────────────────────────
# NLP EXPENSE EXTRACTION
# ─────────────────────────────────────

def extract_expense_from_text(
    text: str
):

    prompt = f"""
Extract expense data from this text.

Text:
{text}

Return ONLY valid JSON.

Format:
{{
  "title": "Uber",
  "amount": 18,
  "category": "Transport",
  "expense_date": "{date.today().isoformat()}"
}}

Rules:
- Use double quotes
- No markdown
- No explanation
- Use today's date if missing
"""

    try:

        extracted_text = (
            generate_ai_response(prompt)
        )

        print(extracted_text)

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
            "title": "Unknown",
            "amount": 0,
            "category": "Other",
            "expense_date":
                date.today().isoformat()
        }
