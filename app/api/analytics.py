from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.analytics import ExpenseAnalyticsResponse
from app.services.analytics_service import (
    generate_expense_analytics
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/summary",
    response_model=ExpenseAnalyticsResponse
)
def get_analytics_summary(
    db: Session = Depends(get_db)
):
    return generate_expense_analytics(db)
