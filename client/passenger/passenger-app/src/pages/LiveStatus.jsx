import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getLiveStatusThunk } from '../store/trainSlice.js'


export default function LiveStatus() {
const [trainNo, setTrainNo] = useState('12608')
const dispatch = useDispatch()
const { status, liveStatus, error } = useSelector(s => s.trains.live)


const onCheck = () => dispatch(getLiveStatusThunk({ trainNo }))


return (
<div className="card">
<h2>Live Status</h2>
<div className="row">
<input className="input" placeholder="Train Number" value={trainNo} onChange={e => setTrainNo(e.target.value)} />
<button className="btn brand" onClick={onCheck}>Check</button>
</div>
{status === 'loading' && <p>Fetching…</p>}
{error && <p style={{color:'#ff9b9b'}}>Error: {error}</p>}
{liveStatus && (
<div style={{marginTop:12, display:'grid', gap:8}}>
<div><strong>{liveStatus.number}</strong> — {liveStatus.name}</div>
<div>Last update: {liveStatus.lastUpdate}</div>
<div>Current station: {liveStatus.currentStation}</div>
<div>Delay: {liveStatus.delay}</div>
</div>
)}
</div>
)
}