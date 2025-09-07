import joblib
import numpy as np
import os

# Load trained ML model using joblib
model_path = os.path.join(os.path.dirname(__file__), "models", "delay_predictor.pkl")
model = joblib.load(model_path)

# Define expected features by the model
FEATURES = ["feature1", "feature2", "feature3"]  # adjust according to your model

def predict_delay(payload: dict):
    """
    payload should include keys: 'trainNumber' + feature values
    Example: {"trainNumber": "12345", "feature1": 0.1, "feature2": 5, "feature3": 1}
    """
    X = np.array([[payload[f] for f in FEATURES]])
    delay = model.predict(X)[0]
    return {"trainNumber": payload.get("trainNumber"), "predictedDelay": float(delay)}
