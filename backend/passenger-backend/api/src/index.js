import express from "express";
import { connectDB } from "./config/db.js";      // updated path
import { config } from "./config/config.js";    // updated path

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

app.listen(config.port, () =>
  console.log(`🚆 API server running at http://localhost:${config.port}`)
);
