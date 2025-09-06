from fastapi import APIRouter, HTTPException
from services.pnr_service import get_pnr_status

router = APIRouter()

@router.get("/{pnr}")
async def pnr_status(pnr: str):
    status = await get_pnr_status(pnr)
    if not status:
        raise HTTPException(status_code=404, detail="PNR not found")
    return status
