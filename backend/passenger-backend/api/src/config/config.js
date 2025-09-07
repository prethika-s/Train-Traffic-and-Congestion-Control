// src/config/config.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  mlServiceUrl: process.env.ML_SERVICE_URL,
  delayAlertThreshold: Number(process.env.DELAY_ALERT_THRESHOLD || 15)
};
