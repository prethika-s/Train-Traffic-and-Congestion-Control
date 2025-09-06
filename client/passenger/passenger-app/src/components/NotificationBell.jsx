import { useDispatch, useSelector } from 'react-redux'
import { clearAll } from '../store/notificationsSlice.js'


export default function NotificationBell() {
const { items } = useSelector(s => s.notifications)
const dispatch = useDispatch()
return (
<div style={{position:'relative'}}>
<div className="badge" title="Notifications">🔔 {items.length}</div>
{items.length > 0 && (
<div className="card" style={{position:'absolute', right:0, marginTop:8, width:300}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
<strong>Notifications</strong>
<button className="btn" onClick={() => dispatch(clearAll())}>Clear</button>
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
)}
</div>
)
}