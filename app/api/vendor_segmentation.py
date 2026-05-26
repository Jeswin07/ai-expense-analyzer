from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.services.vendor_segmentation_service import (
    get_vendor_segmentation
)

router = APIRouter(
    prefix="/vendor-segmentation",
    tags=["Vendor Segmentation"]
)


@router.get("/")
def vendor_segmentation(
    db: Session = Depends(get_db)
):

    return get_vendor_segmentation(db)
