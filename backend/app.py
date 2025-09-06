from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import connect_db, disconnect_db
from api import trains, pnr, alerts
from config import config

app = FastAPI(title="Passenger Backend", version="1.0")

# CORS (allow frontend React to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(trains.router, prefix="/api/trains", tags=["Trains"])
app.include_router(pnr.router, prefix="/api/pnr", tags=["PNR"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])

# Startup & Shutdown DB
@app.on_event("startup")
async def startup_event():
    await connect_db()

@app.on_event("shutdown")
async def shutdown_event():
    await disconnect_db()

# Healthcheck endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "env": config.ENV}
