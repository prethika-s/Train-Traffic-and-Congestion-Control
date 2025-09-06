import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import TrainCard from '../components/TrainCard.jsx'
import { searchTrainsThunk, addJourneyThunk } from '../store/trainSlice.js'


export default function Home() {
const [from, setFrom] = useState('SBC')
const [to, setTo] = useState('MAS')
const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
const dispatch = useDispatch()
const { results, status, error } = useSelector(s => s.trains.search)


const onSearch = () => {
dispatch(searchTrainsThunk({ from, to, date }))
}


return (
<div className="card">
<h2>Find Trains</h2>
<div className="row">
<input className="input" placeholder="From (code)" value={from} onChange={e => setFrom(e.target.value.toUpperCase())} />
<input className="input" placeholder="To (code)" value={to} onChange={e => setTo(e.target.value.toUpperCase())} />
<input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
<button className="btn brand" onClick={onSearch}>Search</button>
</div>


{status === 'loading' && <p>Loading…</p>}
{error && <p style={{color:'#ff9b9b'}}>Error: {error}</p>}


<div className="row" style={{marginTop:12}}>
{results.map(tr => (
<TrainCard key={tr.number} train={tr} onAdd={() => dispatch(addJourneyThunk(tr))} />
))}
</div>
</div>
)
}