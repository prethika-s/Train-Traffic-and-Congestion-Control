from database.collections import trains_collection

async def search_trains(query: str):
    cursor = trains_collection().find({"train_id": {"$regex": query, "$options": "i"}})
    return [doc async for doc in cursor]

async def get_train_by_id(train_id: str):
    return await trains_collection().find_one({"train_id": train_id})
