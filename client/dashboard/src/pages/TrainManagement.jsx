import React, { useEffect, useState } from "react";
import { fetchTrainData } from "../services/api";

const TrainManagement = () => {
  const [trains, setTrains] = useState([]);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
  fetchTrainData().then((data) => {
    setTrains(data);
  });
}, []);

  const filteredTrains =
    searchId.trim() === ""
      ? trains
      : trains.filter(
          (train) =>
            train.Train_ID?.toString().toLowerCase() === searchId.toLowerCase().trim()
        );
  const formatExcelTime = (value) => {
    if (!value || isNaN(value)) return value;
    const totalMinutes = Math.round(value * 24 * 60);
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const minutes = (totalMinutes % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="train-management-page">
      <h2>Train Management</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by Train ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Train ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Start-End</th>
            <th>Track No</th>
            <th>Section</th>
            <th>Scheduled Departure</th>
            <th>Scheduled Arrival</th>
            <th>Actual Arrival</th>
            <th>Delay(mins)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train, index) => (
              <tr key={`${train.id}-${index}`}>
                <td>{train.Train_ID}</td>
                <td>{train.Train_Name}</td>
                <td>{train.Train_Type}</td>
                <td>{train.Priority}</td>
                <td>{train.Source} - {train.Destination}</td>
                <td>{train.Track_No}</td>
                <td>{train.Section}</td>
                <td>{formatExcelTime(train.Scheduled_Departure)}</td>
                <td>{formatExcelTime(train.Scheduled_Arrival)}</td>
                <td>{formatExcelTime(train.Actual_Arrival)}</td>
                <td>{Number(train['Delay(mins)'])}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" style={{ textAlign: "center" }}>
                No train found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainManagement;