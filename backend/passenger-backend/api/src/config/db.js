import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo error:", err);
    process.exit(1);
  }
};
