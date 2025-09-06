import { useSelector, useDispatch } from 'react-redux'
import TrainCard from '../components/TrainCard.jsx'
import { removeJourneyThunk } from '../store/trainSlice.js'


export default function MyJourneys() {
const { myJourneys } = useSelector(s => s.trains)
const dispatch = useDispatch()


if (!myJourneys.length) {
return <div className="card">No journeys saved yet. Go to Home and add one.</div>
}


return (
<div className="row">
{myJourneys.map(tr => (
<div key={tr.number} style={{position:'relative', flex:'1 1 320px'}}>
<TrainCard train={tr} />
<button className="btn" style={{position:'absolute', top:12, right:12}} onClick={() => dispatch(removeJourneyThunk(tr.number))}>Remove</button>
</div>
))}
</div>
)
}