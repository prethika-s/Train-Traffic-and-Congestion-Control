import api from './_axios.js'


const USE_MOCK = !import.meta.env.VITE_API_BASE_URL


export async function getPnrStatus(pnr) {
if (USE_MOCK) {
await delay(400)
return {
pnr,
journey: { from: 'SBC', to: 'MAS', date: new Date().toISOString().slice(0,10) },
passengers: [
{ name: 'Passenger 1', status: 'CNF', coach: 'S1', berth: '32' },
{ name: 'Passenger 2', status: 'RAC', coach: 'S1', berth: 'Side' }
]
}
}
const { data } = await api.get('/pnr', { params: { pnr } })
return data
}


function delay(ms){ return new Promise(r => setTimeout(r, ms)) }