import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

# Number of train records
n_trains = 2000

train_ids = [f"T{i+1:03d}" for i in range(n_trains)]
distances = np.random.randint(50, 500, n_trains)  
scheduled_speeds = np.random.randint(40, 100, n_trains)  

scheduled_times = (distances / scheduled_speeds) * 60

actual_speeds = scheduled_speeds * (1 + np.random.uniform(-0.3, 0.3, n_trains))

actual_times = (distances / actual_speeds) * 60

base_time = datetime.strptime("06:00", "%H:%M")
departure_times = [base_time + timedelta(minutes=random.randint(0, 300)) for _ in range(n_trains)]

scheduled_arrivals = [departure_times[i] + timedelta(minutes=scheduled_times[i]) for i in range(n_trains)]
actual_arrivals = [departure_times[i] + timedelta(minutes=actual_times[i]) for i in range(n_trains)]

actual_delays = [(actual_times[i] - scheduled_times[i]) for i in range(n_trains)]

predicted_delays = [((scheduled_speeds[i] - actual_speeds[i]) / scheduled_speeds[i]) * scheduled_times[i] 
                    for i in range(n_trains)]

df = pd.DataFrame({
    "train_id": train_ids,
    "distance_km": distances,
    "scheduled_speed_kmh": scheduled_speeds.round(2),
    "actual_speed_kmh": actual_speeds.round(2),
    "scheduled_time_min": scheduled_times.round(2),
    "actual_time_min": actual_times.round(2),
    "departure_time": [t.strftime("%H:%M") for t in departure_times],
    "scheduled_arrival": [t.strftime("%H:%M") for t in scheduled_arrivals],
    "actual_arrival": [t.strftime("%H:%M") for t in actual_arrivals],
    "actual_delay_min": np.round(actual_delays, 2),
    "predicted_delay_min": np.round(predicted_delays, 2)
})

df.to_csv("simulated_train_delay_dataset.csv", index=False)

print("Dataset created and saved as simulated_train_delay_dataset.csv")
print(df.head(10))  
