from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.expenses import router as expense_router
from app.api.health import router as health_router
from app.core.config import settings
from app.db.init_db import create_tables
from app.api.analytics import router as analytics_router
from app.api.ai import router as ai_router
from app.api.nlp import router as nlp_router

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
