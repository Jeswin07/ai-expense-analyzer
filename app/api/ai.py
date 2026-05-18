from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.ai import AISummaryResponse
from app.services.ai_service import (
    generate_ai_financial_summary
)
from app.services.analytics_service import (
    generate_expense_analytics
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.get(
    "/summary",
    response_model=AISummaryResponse
)
def get_ai_summary(
    db: Session = Depends(get_db)
):
    analytics = generate_expense_analytics(db)

    ai_summary = generate_ai_financial_summary(
        analytics
    )

    return {
        "ai_summary": ai_summary
    }
