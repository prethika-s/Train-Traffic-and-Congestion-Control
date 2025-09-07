// importTrains.js
import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";

// 1. Define Train Schema
const TrainSchema = new mongoose.Schema({
  trainNumber: String,
  trainName: String,
  schedule: [
    {
      stationCode: String,
      stationName: String,
      arrival: String,
      departure: String,
      day: Number,
      platform: String,
    },
  ],
  coachComposition: [
    {
      coachType: String,
      count: Number,
    },
  ],
});

const Train = mongoose.model("Train", TrainSchema);

// 2. Import function
async function importCSV() {
  await mongoose.connect("mongodb://localhost:27017/traintraffic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const trains = {};

  fs.createReadStream(
    "/Users/rishikaas/Documents/passenger-app/passenger-backend/api/data/mock_railway_data_full_ENRICHED.csv"
  )
    .pipe(csv())
    .on("data", (row) => {
      const trainNumber = row.trainNumber || row.TRAIN_NO;

      if (!trains[trainNumber]) {
        trains[trainNumber] = {
          trainNumber,
          trainName: row.trainName || row.TRAIN_NAME,
          schedule: [],
          coachComposition: [],
        };
      }

      // Push schedule entry
      trains[trainNumber].schedule.push({
        stationCode: row.stationCode || row.STN_CODE,
        stationName: row.stationName || row.STN_NAME,
        arrival: row.arrival || row.ARR_TIME || null,
        departure: row.departure || row.DEP_TIME || null,
        day: parseInt(row.day || row.DAY || 1),
        platform: row.platform || row.PLATFORM || null,
      });

      // Push coach info (if available)
      if (row.coachType || row.COACH_TYPE) {
        const coachType = row.coachType || row.COACH_TYPE;
        const coachCount = parseInt(row.coachCount || row.COACH_COUNT || 1);

        if (
          !trains[trainNumber].coachComposition.find(
            (c) => c.coachType === coachType
          )
        ) {
          trains[trainNumber].coachComposition.push({
            coachType,
            count: coachCount,
          });
        }
      }
    })
    .on("end", async () => {
      console.log("CSV processed, saving to DB...");

      for (let t of Object.values(trains)) {
        await Train.updateOne(
          { trainNumber: t.trainNumber },
          { $set: t },
          { upsert: true }
        );
      }

      console.log("✅ Import completed!");
      mongoose.disconnect();
    });
}

importCSV();
