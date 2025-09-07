import fs from 'fs'
import csv from 'csv-parser'

const data = []

// Load CSV file
export function loadCSV(path) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => {
        console.log(`✅ CSV loaded: ${data.length} records`)
        resolve(data)
      })
      .on('error', reject)
  })
}

// Get all CSV data
export function getData() {
  return data
}

// 🔹 Simulate live status for a train
export function getLiveStatusService(trainNumber) {
  // Find train timetable
  const timetable = data.filter(row => row.trainNumber === trainNumber)
  if (!timetable.length) return null

  // Simulate: pick a "current station" randomly
  const currentIndex = Math.floor(Math.random() * timetable.length)
  const currentStation = timetable[currentIndex].stationName || timetable[currentIndex].trainName

  // Simulate delay in minutes (-5 to +30)
  const delay = Math.floor(Math.random() * 36) - 5

  // Format last update time
  const lastUpdate = new Date().toLocaleString()

  return {
    number: trainNumber,
    name: timetable[0].trainName,
    currentStation,
    delay: delay > 0 ? `${delay} min late` : delay < 0 ? `${Math.abs(delay)} min early` : 'On time',
    lastUpdate
  }
}
