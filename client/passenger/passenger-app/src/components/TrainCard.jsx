export default function TrainCard({ train, onAdd }) {
if (!train) return null
return (
<div className="card" style={{flex: '1 1 320px'}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
<h3 style={{margin:0}}>{train.number} — {train.name}</h3>
<span className="badge">{train.type ?? 'EXP'}</span>
</div>
<div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
<div>
<div style={{fontSize:12, color:'var(--muted)'}}>From</div>
<div>{train.from?.code} {train.from?.name ? `— ${train.from.name}` : ''}</div>
</div>
<div>
<div style={{fontSize:12, color:'var(--muted)'}}>To</div>
<div>{train.to?.code} {train.to?.name ? `— ${train.to.name}` : ''}</div>
</div>
<div>
<div style={{fontSize:12, color:'var(--muted)'}}>Departs</div>
<div>{train.departure}</div>
</div>
<div>
<div style={{fontSize:12, color:'var(--muted)'}}>Arrives</div>
<div>{train.arrival}</div>
</div>
</div>
<div style={{marginTop:12, display:'flex', gap:8}}>
<button className="btn" onClick={() => window.alert('Live status coming soon')}>Live Status</button>
{onAdd && <button className="btn brand" onClick={onAdd}>Add to My Journeys</button>}
</div>
</div>
)
}