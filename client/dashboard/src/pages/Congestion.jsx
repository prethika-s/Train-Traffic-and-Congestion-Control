import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { fetchTrainData } from "../services/trainDataService";
import "leaflet/dist/leaflet.css";
import "../styles/dashboard.css";

function Congestion() {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    fetchTrainData().then(setTrainData);
  }, []);

  const stationCongestion = Object.values(
  trainData.reduce((acc, t) => {
    if (!t.currentStation) return acc;

    const lat = Number(t.currentLat);
    const lon = Number(t.currentLon);

    // validate coords
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return acc;
    }

    if (!acc[t.currentStation]) {
      acc[t.currentStation] = {
        station: t.currentStation,
        lat,
        lon,
        totalDelay: 0,
        count: 0,
      };
    }

    acc[t.currentStation].totalDelay += Number(t.delay) || 0;
    acc[t.currentStation].count += 1;
    return acc;
  }, {})
).map((s, idx) => ({
  ...s,
  avgDelay: s.count ? s.totalDelay / s.count : 0,
  idx,
}));


  return (
    <div className="dashboard-container">
      <div className="section-title">Congestion Heatmap</div>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "500px", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stationCongestion.map((area) => (
          <Circle
            key={`${area.station}-${area.idx}`}
            center={[area.lat, area.lon]}
            radius={area.avgDelay * 1000}
            pathOptions={{
              fillColor: "#ff4d4f",
              color: "#faad14",
              fillOpacity: Math.min(area.avgDelay / 20, 0.8),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default Congestion;