import { NavLink } from 'react-router-dom'
import NotificationBell from './NotificationBell.jsx'


export default function Navbar() {
return (
<div className="nav">
<div className="nav-inner container">
<div style={{display:'flex', gap:8, alignItems:'center'}}>
<span className="badge">v0.0.0</span>
<strong>Passenger</strong>
</div>
<div style={{display:'flex', gap:8, alignItems:'center'}}>
<NavLink to="/" className={({isActive}) => isActive? 'active' : ''}>Home</NavLink>
<NavLink to="/journeys" className={({isActive}) => isActive? 'active' : ''}>My Journeys</NavLink>
<NavLink to="/live" className={({isActive}) => isActive? 'active' : ''}>Live Status</NavLink>
<NavLink to="/timetable" className={({isActive}) => isActive? 'active' : ''}>Timetable</NavLink>
<NavLink to="/alerts" className={({isActive}) => isActive? 'active' : ''}>Alerts</NavLink>
<NotificationBell />
</div>
</div>
</div>
)
}