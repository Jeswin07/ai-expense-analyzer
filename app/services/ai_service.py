import httpx


OLLAMA_URL = "http://localhost:11434/api/generate"


def generate_ai_financial_summary(
    analytics_data: dict
):
    prompt = f"""
    You are an advanced financial behavior analyst.

    Analyze this financial profile carefully.

    Financial Data:

    Total Spending:
    {analytics_data["total_spending"]}

    Total Expenses:
    {analytics_data["total_expenses"]}

    Top Spending Category:
    {analytics_data["top_category"]}

    Top Category Percentage:
    {analytics_data["top_category_percentage"]}%

    Average Daily Spending:
    {analytics_data["average_daily_spending"]}

    Largest Expense:
    {analytics_data["largest_expense"]}

    Weekend Spending Percentage:
    {analytics_data["weekend_spending_percentage"]}%

    Spending Spike Detected:
    {analytics_data["spending_spike_detected"]}

    Monthly Spending Change:
    {analytics_data["monthly_spending_change_percentage"]}%

    Recurring Expenses:
    {analytics_data["recurring_expenses"]}

    Budget Warning:
    {analytics_data["budget_warning"]}

    Financial Health Score:
    {analytics_data["financial_health_score"]}

    Provide:
    1. Spending behavior analysis
    2. Financial risk observations
    3. Budget improvement suggestions
    4. Behavioral spending patterns
    5. Actionable recommendations

    Focus heavily on:
    - spending habits
    - recurring financial risks
    - budget balance
    - financial discipline
    - behavioral patterns

    Keep response concise but insightful.
    """

    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = httpx.post(
            OLLAMA_URL,
            json=payload,
            timeout=60.0
        )

        result = response.json()

        return result["response"]

    except httpx.HTTPError:
        return (
            "AI service temporarily unavailable."
        )
