import joblib
import pandas as pd
from database.collections import trains_collection

# Load trained ML model
model = joblib.load("models/delay_predictor.pkl")

async def predict_delay(train_id: str):
    train = await trains_collection().find_one({"train_id": train_id})
    if not train:
        return None

    features = pd.DataFrame([{
        "distance_km": train["distance_km"],
        "scheduled_speed_kmh": train["scheduled_speed_kmh"],
        "actual_speed_kmh": train["actual_speed_kmh"],
        "scheduled_time_min": train["scheduled_time_min"],
        "actual_time_min": train["actual_time_min"]
    }])

    prediction = model.predict(features)[0]
    return float(prediction)
