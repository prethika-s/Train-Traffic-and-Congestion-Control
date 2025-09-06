import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv("data/simulated_train_delay_dataset.csv")

X = df[["distance_km", "scheduled_speed_kmh", "actual_speed_kmh", "scheduled_time_min", "actual_time_min"]]
y = df["actual_delay_min"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

print("✅ Model trained. R^2 score:", model.score(X_test, y_test))

joblib.dump(model, "models/delay_predictor.pkl")
print("✅ Model saved at models/delay_predictor.pkl")
