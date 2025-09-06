import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/dashboard.css';
import { fetchTrainData } from '../services/trainDataService';

const severityColors = {
  High: '#ff4d4f',
  Medium: '#faad14',
  Low: '#52c41a',
};

const graphTabs = [
  { key: 'congestion', label: 'Congestion Trends' },
  { key: 'punctuality', label: 'Train Punctuality' },
  { key: 'passengers', label: 'Train Counts by Section' },
];

function getSeverity(delay) {
  if (delay >= 10) return 'High';
  if (delay >= 5) return 'Medium';
  return 'Low';
}

function Dashboard() {
  const [trainData, setTrainData] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedTab, setSelectedTab] = useState('congestion');

  useEffect(() => {
    fetchTrainData().then(setTrainData);
  }, []);

  // Delays
  const delayCards = trainData
    .filter(t => t.delay > 0)
    .map((t, idx) => ({
      train: t.name,
      station: t.currentStation,
      delay: t.delay,
      severity: getSeverity(t.delay),
      idx,
    }))
    .filter(d => selectedSeverity === 'All' || d.severity === selectedSeverity);

  // Graphs
  const stationCongestion = Object.values(
    trainData.reduce((acc, t) => {
      if (!t.currentStation) return acc;
      if (!acc[t.currentStation]) {
        acc[t.currentStation] = { station: t.currentStation, totalDelay: 0, count: 0 };
      }
      acc[t.currentStation].totalDelay += t.delay;
      acc[t.currentStation].count += 1;
      return acc;
    }, {})
  ).map(s => ({
    name: s.station,
    avgDelay: s.count ? Math.round(s.totalDelay / s.count) : 0,
  }));

  const graphData = {
    congestion: stationCongestion,
    punctuality: trainData.map(t => ({
      name: t.name,
      onTime: t.delay === 0 ? 1 : 0,
      delayed: t.delay > 0 ? 1 : 0,
    })),
    passengers: Object.values(
      trainData.reduce((acc, t) => {
        if (!t.section) return acc;
        if (!acc[t.section]) acc[t.section] = { name: t.section, count: 0 };
        acc[t.section].count += 1;
        return acc;
      }, {})
    ),
  };

  return (
    <div className="dashboard-container">
      {/* Graphs Section */}
      <div className="graph-section">
        <div className="section-title">Analytics</div>
        <div className="tabs">
          {graphTabs.map(tab => (
            <button
              key={tab.key}
              className={`tab-btn${selectedTab === tab.key ? ' active' : ''}`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ height: '300px' }}>
          {selectedTab === 'congestion' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData.congestion}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="avgDelay" fill="#2a3a6e" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {selectedTab === 'punctuality' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData.punctuality}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="onTime" stroke="#52c41a" />
                <Line type="monotone" dataKey="delayed" stroke="#ff4d4f" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {selectedTab === 'passengers' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={graphData.passengers}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#2a3a6e"
                  label
                >
                  {graphData.passengers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#2a3a6e', '#faad14', '#52c41a'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Delays Section */}
      <div>
        <div className="section-title">Train Delays</div>
        <div className="filter-bar">
          <label htmlFor="severity-filter">Filter by Severity:</label>
          <select
            id="severity-filter"
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="cards-row">
          {delayCards.map((delay) => (
            <div className="delay-card" key={`${delay.train}-${delay.station}-${delay.idx}`}>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{delay.train}</div>
              <div>Station: {delay.station}</div>
              <div>Delay: <span style={{ color: severityColors[delay.severity], fontWeight: 700 }}>{delay.delay} min</span></div>
              <div>Severity: <span style={{ color: severityColors[delay.severity] }}>{delay.severity}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>  
  );
}

export default Dashboard;
