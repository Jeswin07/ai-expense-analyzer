from fastapi import APIRouter

from app.schemas.nlp import (
    ExtractedExpenseResponse
)
from app.schemas.nlp import (
    NaturalLanguageExpenseRequest
)
from app.services.ai_service import (
    extract_expense_from_text
)

router = APIRouter(
    prefix="/nlp",
    tags=["Natural Language"]
)


@router.post(
    "/extract-expense",
    response_model=ExtractedExpenseResponse
)
def extract_expense(
    request:
    NaturalLanguageExpenseRequest
):
    extracted_data = (
        extract_expense_from_text(
            request.text
        )
    )

    return extracted_data
