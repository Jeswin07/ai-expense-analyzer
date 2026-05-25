from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.services.forecasting_service import (
    forecast_expenses
)

router = APIRouter(
    prefix="/forecasting",
    tags=["Forecasting"]
)


@router.get("/")
def get_forecast(
    db: Session = Depends(get_db)
):

    return forecast_expenses(db)