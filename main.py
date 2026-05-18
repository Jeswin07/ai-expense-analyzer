from fastapi import FastAPI

from app.api.expenses import router as expense_router
from app.api.health import router as health_router
from app.core.config import settings
from app.db.init_db import create_tables
from app.api.analytics import router as analytics_router
from app.api.ai import router as ai_router
from app.api.nlp import router as nlp_router

create_tables()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version
)

app.include_router(health_router)
app.include_router(expense_router)
app.include_router(analytics_router)
app.include_router(ai_router)
app.include_router(nlp_router)
