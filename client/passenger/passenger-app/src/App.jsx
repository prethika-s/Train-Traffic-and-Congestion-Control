import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import MyJourneys from './pages/MyJourneys.jsx'
import LiveStatus from './pages/LiveStatus.jsx'
import Timetable from './pages/Timetable.jsx'
import Alerts from './pages/Alerts.jsx'


export default function App() {
return (
<div>
<Navbar />
<div className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/journeys" element={<MyJourneys />} />
<Route path="/live" element={<LiveStatus />} />
<Route path="/timetable" element={<Timetable />} />
<Route path="/alerts" element={<Alerts />} />
<Route path="*" element={<div className="card">Not found</div>} />
</Routes>
</div>
</div>
)
}