import api from './_axios.js'


const USE_MOCK = !import.meta.env.VITE_API_BASE_URL


export async function getTimetable({ trainNo }) {
if (USE_MOCK) {
await new Promise(r => setTimeout(r, 500))
return [
{ code: 'SBC', name: 'KSR Bengaluru', arrival: '-', departure: '07:00', day: 1 },
{ code: 'BWT', name: 'Bangarapet', arrival: '07:58', departure: '08:00', day: 1 },
{ code: 'KPD', name: 'Katpadi Jn', arrival: '10:15', departure: '10:20', day: 1 },
{ code: 'MAS', name: 'MGR Chennai Central', arrival: '13:30', departure: '-', day: 1 }
]
}
const { data } = await api.get(`/trains/${trainNo}/timetable`)
return data
}