from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("/health")
def health_check():
    
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": settings.app_version
    }
