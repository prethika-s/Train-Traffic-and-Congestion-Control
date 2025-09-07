import fs from 'fs'
import csv from 'csv-parser'
const data = []

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

export function getData() {
  return data
}
