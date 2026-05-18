import httpx


OLLAMA_URL = "http://localhost:11434/api/generate"


def generate_ai_financial_summary(
    analytics_data: dict
):
    prompt = f"""
    You are an intelligent financial assistant.

    Analyze this financial summary:

    Total Spending: {analytics_data["total_spending"]}
    Total Expenses: {analytics_data["total_expenses"]}
    Top Category: {analytics_data["top_category"]}

    Give concise financial insights and recommendations, be concise and dont make it too long.
    """

    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    response = httpx.post(
        OLLAMA_URL,
        json=payload,
        timeout=60.0
    )

    result = response.json()

    return result["response"]
