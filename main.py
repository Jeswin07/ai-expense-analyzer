from fastapi import FastAPI

from app.api.health import router as health_router

app = FastAPI(
    title="AI Expense Analyzer",
    version="1.0.0"
)

app.include_router(health_router)