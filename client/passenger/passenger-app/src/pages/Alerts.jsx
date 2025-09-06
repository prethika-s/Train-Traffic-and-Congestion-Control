import { useDispatch, useSelector } from 'react-redux'
import { addNotification, clearAll } from '../store/notificationsSlice.js'


export default function Alerts() {
const dispatch = useDispatch()
const { items } = useSelector(s => s.notifications)


const addSample = () => {
const ex = { text: 'Train 12608 running late by 20 mins at KPD', ts: Date.now() }
dispatch(addNotification(ex))
}


return (
<div className="card">
<h2>Alerts</h2>
<div className="row">
<button className="btn brand" onClick={addSample}>Add Sample Alert</button>
<button className="btn" onClick={() => dispatch(clearAll())}>Clear All</button>
</div>
<ul>
{items.map((n, i) => (
<li key={i} style={{marginTop:8}}>
<div style={{fontSize:12, color:'var(--muted)'}}>{new Date(n.ts).toLocaleString()}</div>
<div>{n.text}</div>
</li>
))}
</ul>
</div>
)
}