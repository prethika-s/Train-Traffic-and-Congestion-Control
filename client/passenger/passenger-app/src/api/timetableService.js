import { loadDataset } from './dataset.js'

export async function getTimetable({ trainNo }) {
  const rows = await loadDataset()
  const r = rows.find(x => String(x.Train_ID) === String(trainNo))
  if (!r) throw new Error(`Train ${trainNo} not found in dataset`)

  const stops = []

  // Origin
  stops.push({
    code: r.Source,
    name: r.Source,
    arrival: '—',
    departure: r.Scheduled_Departure || '—',
    day: 1,
  })

  // Current (if present)
  if (r.Current_Station && r.Current_Station !== r.Source && r.Current_Station !== r.Destination) {
    stops.push({
      code: r.Current_Station,
      name: r.Current_Station,
      arrival: r.Actual_Arrival || r.Scheduled_Arrival || '—',
      departure: '—',
      day: 1,
    })
  }

  // Destination
  stops.push({
    code: r.Destination,
    name: r.Destination,
    arrival: r.Scheduled_Arrival || '—',
    departure: '—',
    day: 1,
  })

  return stops
}
