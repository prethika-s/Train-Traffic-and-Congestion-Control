import { loadDataset, norm, nowISO } from './dataset.js'

// Flexible match: accepts station codes or names, partials, case-insensitive
function matchesStation(cell, query) {
  if (!query) return true
  const c = norm(cell)
  const q = norm(query)
  return c.includes(q)
}

export async function searchTrains({ from, to /*, date*/ }) {
  const rows = await loadDataset()

  // Filter by Source/Destination; allow partial match
  const filtered = rows.filter(r =>
    matchesStation(r.Source, from) && matchesStation(r.Destination, to)
  )

  // Shape into cards your UI expects
  return filtered.map(r => ({
    number: r.Train_ID,            // real number we injected
    name: r.Train_Name,            // real name we injected
    type: r.Train_Type || 'EXP',
    from: { code: r.Source, name: r.Source },
    to: { code: r.Destination, name: r.Destination },
    departure: r.Scheduled_Departure || '—',
    arrival: r.Scheduled_Arrival || '—',
    // keep some extras if you want to show later
    delayMins: r['Delay(mins)'] ?? '',
    currentStation: r.Current_Station || '',
  }))
}

export async function getLiveStatus({ trainNo }) {
  const rows = await loadDataset()
  const hit = rows.find(r => String(r.Train_ID) === String(trainNo))
  if (!hit) throw new Error(`Train ${trainNo} not found in dataset`)

  return {
    number: hit.Train_ID,
    name: hit.Train_Name,
    lastUpdate: nowISO(),
    currentStation: hit.Current_Station || '(en-route)',
    delay: (hit['Delay(mins)'] != null ? `${hit['Delay(mins)']} mins` : '—'),
    // If you later show maps:
    currentLat: hit.Current_Lat ? Number(hit.Current_Lat) : undefined,
    currentLon: hit.Current_Lon ? Number(hit.Current_Lon) : undefined,
  }
}
