from pydantic import BaseModel


class NaturalLanguageExpenseRequest(
    BaseModel
):
    text: str


class ExtractedExpenseResponse(
    BaseModel
):
    title: str
    amount: float
    category: str
    expense_date: str
