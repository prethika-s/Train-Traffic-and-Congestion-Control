import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getTimetableThunk } from '../store/trainSlice.js'


export default function Timetable() {
const [trainNo, setTrainNo] = useState('12608')
const dispatch = useDispatch()
const { status, timetable, error } = useSelector(s => s.trains.timetable)


return (
<div className="card">
<h2>Train Timetable</h2>
<div className="row">
<input className="input" placeholder="Train Number" value={trainNo} onChange={e => setTrainNo(e.target.value)} />
<button className="btn brand" onClick={() => dispatch(getTimetableThunk({ trainNo }))}>Get Timetable</button>
</div>
{status === 'loading' && <p>Loading…</p>}
{error && <p style={{color:'#ff9b9b'}}>Error: {error}</p>}
{timetable.length > 0 && (
<div style={{marginTop:12}}>
<table style={{width:'100%', borderCollapse:'collapse'}}>
<thead>
<tr>
<th style={{textAlign:'left', padding:'8px 6px'}}>Station</th>
<th style={{textAlign:'left', padding:'8px 6px'}}>Arr</th>
<th style={{textAlign:'left', padding:'8px 6px'}}>Dep</th>
<th style={{textAlign:'left', padding:'8px 6px'}}>Day</th>
</tr>
</thead>
<tbody>
{timetable.map((s, i) => (
<tr key={i} style={{borderTop:'1px solid #263057'}}>
<td style={{padding:'8px 6px'}}>{s.code} — {s.name}</td>
<td style={{padding:'8px 6px'}}>{s.arrival}</td>
<td style={{padding:'8px 6px'}}>{s.departure}</td>
<td style={{padding:'8px 6px'}}>{s.day}
</td>
</tr>
))}
</tbody>
</table>
</div>
)}
</div>
)
}