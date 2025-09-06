import api from './_axios.js'


const USE_MOCK = !import.meta.env.VITE_API_BASE_URL


export async function searchTrains({ from, to, date }) {
if (USE_MOCK) {
await sleep(600)
return [
{ number: '12608', name: 'Lalbagh Express', type: 'EXP', from: { code: from, name: 'From Station' }, to: { code: to, name: 'To Station' }, departure: '07:00', arrival: '13:30' },
{ number: '12007', name: 'Shatabdi Express', type: 'SHT', from: { code: from }, to: { code: to }, departure: '06:00', arrival: '11:55' }
]
}
const { data } = await api.get('/trains/search', { params: { from, to, date } })
return data
}


export async function getLiveStatus({ trainNo }) {
if (USE_MOCK) {
await sleep(500)
return { number: trainNo, name: 'Sample Express', lastUpdate: new Date().toLocaleString(), currentStation: 'KPD', delay: '+20m' }
}
const { data } = await api.get(`/trains/${trainNo}/live`)
return data
}


function sleep(ms){ return new Promise(r => setTimeout(r, ms)) }