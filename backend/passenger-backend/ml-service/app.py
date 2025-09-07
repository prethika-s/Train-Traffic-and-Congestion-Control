from fastapi import FastAPI
from model import predict_delay

app = FastAPI(title="Train Delay Prediction API")

@app.post("/predict")
def predict(payload: dict):
    """
    Expects JSON payload with trainNumber + features
    """
    result = predict_delay(payload)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
