import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { fetchTrainData } from "../services/trainDataService";
import "leaflet/dist/leaflet.css";
import "../styles/dashboard.css";

// Custom train icon
const trainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function LiveTraffic() {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    fetchTrainData().then(setTrainData);
  }, []);

  const trainLocations = trainData
  .map((t, idx) => ({
    id: t.id,
    name: t.name,
    lat: Number(t.currentLat),
    lon: Number(t.currentLon),
    delay: t.delay,
    idx,
  }))
  .filter(
    (t) =>
      !isNaN(t.lat) &&
      !isNaN(t.lon) &&
      t.lat >= 8 && t.lat <= 37 &&
      t.lon >= 68 && t.lon <= 97
  )
  .map((t) => ({
    ...t,
    position: [t.lat, t.lon],
  }));



  return (
    <div className="dashboard-container">
      <div className="section-title">Live Train Locations</div>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "500px", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {trainLocations.map((train) => (
          <Marker
            key={`${train.id}-${train.idx}`}
            position={train.position}
            icon={trainIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default LiveTraffic;
