from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.ai import (
    AISummaryResponse
)

from app.services.ai_service import (
    generate_ai_business_insights
)

from app.services.analytics_service import (
    generate_expense_analytics
)

from app.services.forecasting_service import (
    forecast_expenses
)

from app.services.vendor_service import (
    vendor_segmentation
)

from app.services.anomaly_service import (
    detect_expense_anomalies
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

    analytics = (
        generate_expense_analytics(db)
    )

    forecasting = (
        forecast_expenses(db)
    )

    vendors = (
        vendor_segmentation(db)
    )

    anomalies = (
        detect_expense_anomalies(db)
    )

    ai_summary = (
        generate_ai_business_insights(

            analytics,

            forecasting,

            vendors,

            anomalies
        )
    )

    return {

        "ai_summary":
            ai_summary
    }
