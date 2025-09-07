import { loadCSV } from '../services/csv.service.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvPath = path.join(__dirname, '../../data/mock_railway_data_full_ENRICHED.csv')

loadCSV(csvPath).then(() => {
  console.log('Seeding complete')
  process.exit(0)
})
