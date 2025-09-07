import pandas as pd
import os

def load_csv():
    path = os.path.join(os.path.dirname(__file__), "data", "mock_railway_data_full_ENRICHED.csv")
    df = pd.read_csv(path)
    return df
