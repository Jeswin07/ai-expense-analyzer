from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.expenses import router as expense_router
from app.api.health import router as health_router
from app.core.config import settings
from app.db.init_db import create_tables
from app.api.analytics import router as analytics_router
from app.api.ai import router as ai_router
from app.api.nlp import router as nlp_router
from app.api.vendor_segmentation import router as vendor_segmentation_router
from app.api.anomaly_detection import router as anomaly_detection_router
from app.api.forecasting import router as forecasting_router
from app.api.csv_import import router as csv_import_router
from app.api.auth import router as auth_router

create_tables()

app = FastAPI(
    title="AI Expense Analyzer v2",
    version=settings.app_version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://ai-expense-analyzer-tau.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(expense_router)
app.include_router(analytics_router)
app.include_router(ai_router)
app.include_router(nlp_router)
app.include_router(vendor_segmentation_router)
app.include_router(anomaly_detection_router)
app.include_router(forecasting_router)
app.include_router(csv_import_router)
app.include_router(auth_router)
