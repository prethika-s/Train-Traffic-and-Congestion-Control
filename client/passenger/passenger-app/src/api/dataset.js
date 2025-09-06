import Papa from 'papaparse'

const CSV_URL = '/data/mock_railway_data_full_ENRICHED.csv'
let _cache = null

export async function loadDataset() {
  if (_cache) return _cache
  const res = await fetch(CSV_URL)
  if (!res.ok) throw new Error(`Failed to load dataset: ${res.status}`)
  const text = await res.text()
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
  _cache = data
  return _cache
}

// helpers
export const norm = (s) => String(s ?? '').trim().toLowerCase()
export const nowISO = () => new Date().toISOString()
