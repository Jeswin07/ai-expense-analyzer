from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.services.anomaly_detection_service import (
    detect_expense_anomalies
)

router = APIRouter(
    prefix="/anomaly-detection",
    tags=["Anomaly Detection"]
)


@router.get("/")
def get_anomalies(
    db: Session = Depends(get_db)
):

    return detect_expense_anomalies(db)