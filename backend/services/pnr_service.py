from database.collections import pnr_collection

async def get_pnr_status(pnr: str):
    return await pnr_collection().find_one({"pnr": pnr})
