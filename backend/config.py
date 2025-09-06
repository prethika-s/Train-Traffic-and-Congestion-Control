import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017/passenger_db")
    ENV: str = os.getenv("ENV", "development")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")

config = Config()
