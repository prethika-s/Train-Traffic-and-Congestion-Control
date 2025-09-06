from motor.motor_asyncio import AsyncIOMotorClient
from config import config

client = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(config.MONGO_URI)
    db = client.get_database()
    print("✅ MongoDB Connected")

async def disconnect_db():
    global client
    if client:
        client.close()
        print("❌ MongoDB Disconnected")
