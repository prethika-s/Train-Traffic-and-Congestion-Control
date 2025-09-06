from fastapi import APIRouter, HTTPException
from services.train_service import search_trains, get_train_by_id
from services.ml_service import predict_delay

router = APIRouter()

@router.get("/search")
async def search(query: str):
    results = await search_trains(query)
    return {"results": results}

@router.get("/{train_id}")
async def train_details(train_id: str):
    train = await get_train_by_id(train_id)
    if not train:
        raise HTTPException(status_code=404, detail="Train not found")
    return train

@router.get("/{train_id}/predict_delay")
async def predict(train_id: str):
    delay = await predict_delay(train_id)
    return {"train_id": train_id, "predicted_delay_min": delay}
