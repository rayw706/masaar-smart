import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './App.css';

const metroLines = [
  { id: 1, name: "Line 1 - Blue", nameAr: "الخط الأول - أزرق", stations: 22, length: "38.1 km", color: "#1E90FF" },
  { id: 2, name: "Line 2 - Red", nameAr: "الخط الثاني - أحمر", stations: 20, length: "25.3 km", color: "#FF4444" },
  { id: 3, name: "Line 3 - Orange", nameAr: "الخط الثالث - برتقالي", stations: 22, length: "40.7 km", color: "#FF8C00" },
  { id: 4, name: "Line 4 - Yellow", nameAr: "الخط الرابع - أصفر", stations: 11, length: "12.3 km", color: "#FFD700" },
  { id: 5, name: "Line 5 - Green", nameAr: "الخط الخامس - أخضر", stations: 11, length: "12.9 km", color: "#00CC44" },
  { id: 6, name: "Line 6 - Purple", nameAr: "الخط السادس - بنفسجي", stations: 7, length: "12.4 km", color: "#9B59B6" },
];

const trafficData = [
  { hour: "6AM", congestion: 35, speed: 75, incidents: 1 },
  { hour: "7AM", congestion: 65, speed: 45, incidents: 3 },
  { hour: "8AM", congestion: 90, speed: 20, incidents: 8 },
  { hour: "9AM", congestion: 75, speed: 35, incidents: 5 },
  { hour: "10AM", congestion: 45, speed: 65, incidents: 2 },
  { hour: "11AM", congestion: 40, speed: 70, incidents: 1 },
  { hour: "12PM", congestion: 55, speed: 55, incidents: 4 },
  { hour: "1PM", congestion: 60, speed: 50, incidents: 3 },
  { hour: "2PM", congestion: 50, speed: 60, incidents: 2 },
  { hour: "3PM", congestion: 45, speed: 65, incidents: 1 },
  { hour: "4PM", congestion: 70, speed: 40, incidents: 5 },
  { hour: "5PM", congestion: 95, speed: 15, incidents: 9 },
  { hour: "6PM", congestion: 85, speed: 25, incidents: 7 },
  { hour: "7PM", congestion: 65, speed: 45, incidents: 4 },
  { hour: "8PM", congestion: 40, speed: 70, incidents: 2 },
  { hour: "9PM", congestion: 25, speed: 85, incidents: 1 },
];

const evStations = [
  { id: 1, name: "King Fahd Road", nameAr: "طريق الملك فهد", chargers: 12, available: 8, type: "Fast", district: "Al Olaya" },
  { id: 2, name: "King Abdullah Road", nameAr: "طريق الملك عبدالله", chargers: 8, available: 3, type: "Fast", district: "Al Muruj" },
  { id: 3, name: "Tahlia Street", nameAr: "شارع التحلية", chargers: 6, available: 6, type: "Standard", district: "Al Sulaymaniyah" },
  { id: 4, name: "Exit 7 Ring Road", nameAr: "مخرج 7 الدائري", chargers: 20, available: 15, type: "Superfast", district: "East Ring" },
  { id: 5, name: "Al Nakheel Mall", nameAr: "النخيل مول", chargers: 10, available: 2, type: "Standard", district: "Al Nakheel" },
  { id: 6, name: "KAFD", nameAr: "مركز الملك عبدالله المالي", chargers: 16, available: 12, type: "Fast", district: "King Abdullah District" },
];

const districtData = [
  { district: "Al Olaya", congestion: 85 },
  { district: "Al Malaz", congestion: 72 },
  { district: "Al Nakheel", congestion: 45 },
  { district: "KAFD", congestion: 38 },
  { district: "Al Muruj", congestion: 60 },
  { district: "Al Rawdah", congestion: 55 },
];

const routeDatabase = {
  "King Fahd Road-KAFD": [
    { type: "Fastest", time: "12 min", distance: "8.2 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "18 min", distance: "9.1 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "22 min", distance: "7.8 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "King Fahd Road-Tahlia Street": [
    { type: "Fastest", time: "8 min", distance: "4.1 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "12 min", distance: "4.5 km", mode: "Metro Line 3", congestion: "Low" },
    { type: "Eco", time: "18 min", distance: "3.8 km", mode: "Walk + Bus", congestion: "None" },
  ],
  "King Fahd Road-Al Rawdah": [
    { type: "Fastest", time: "14 min", distance: "9.0 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "20 min", distance: "9.8 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "28 min", distance: "8.5 km", mode: "Bus", congestion: "None" },
  ],
  "King Fahd Road-Exit 7 Ring Road": [
    { type: "Fastest", time: "20 min", distance: "15.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "26 min", distance: "16.0 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "35 min", distance: "14.5 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "King Fahd Road-Al Muruj": [
    { type: "Fastest", time: "16 min", distance: "11.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "22 min", distance: "11.8 km", mode: "Metro Line 3", congestion: "Low" },
    { type: "Eco", time: "30 min", distance: "10.5 km", mode: "Bus", congestion: "None" },
  ],
  "Al Olaya-KAFD": [
    { type: "Fastest", time: "10 min", distance: "6.5 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "14 min", distance: "7.2 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "20 min", distance: "6.0 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Olaya-Tahlia Street": [
    { type: "Fastest", time: "6 min", distance: "3.2 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "10 min", distance: "3.8 km", mode: "Metro Line 3", congestion: "Low" },
    { type: "Eco", time: "15 min", distance: "3.0 km", mode: "Walk", congestion: "None" },
  ],
  "Al Olaya-Al Rawdah": [
    { type: "Fastest", time: "15 min", distance: "9.3 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "20 min", distance: "10.1 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "28 min", distance: "8.8 km", mode: "Bus", congestion: "None" },
  ],
  "Al Olaya-Exit 7 Ring Road": [
    { type: "Fastest", time: "18 min", distance: "13.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "25 min", distance: "14.0 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "33 min", distance: "12.5 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Olaya-Al Muruj": [
    { type: "Fastest", time: "12 min", distance: "8.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "18 min", distance: "8.8 km", mode: "Metro Line 3", congestion: "Low" },
    { type: "Eco", time: "25 min", distance: "7.5 km", mode: "Bus", congestion: "None" },
  ],
  "Al Malaz-KAFD": [
    { type: "Fastest", time: "18 min", distance: "11.2 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "25 min", distance: "12.0 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "35 min", distance: "10.5 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Malaz-Tahlia Street": [
    { type: "Fastest", time: "14 min", distance: "8.5 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "20 min", distance: "9.2 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "28 min", distance: "8.0 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Malaz-Al Rawdah": [
    { type: "Fastest", time: "10 min", distance: "6.0 km", mode: "Car", congestion: "Low" },
    { type: "Recommended", time: "14 min", distance: "6.8 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "20 min", distance: "5.5 km", mode: "Bus", congestion: "None" },
  ],
  "Al Malaz-Exit 7 Ring Road": [
    { type: "Fastest", time: "15 min", distance: "10.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "22 min", distance: "11.0 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "30 min", distance: "9.5 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Malaz-Al Muruj": [
    { type: "Fastest", time: "20 min", distance: "13.0 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "28 min", distance: "14.0 km", mode: "Metro Line 2", congestion: "Low" },
    { type: "Eco", time: "38 min", distance: "12.5 km", mode: "Bus", congestion: "None" },
  ],
  "Airport-KAFD": [
    { type: "Fastest", time: "35 min", distance: "28.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "40 min", distance: "29.5 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "50 min", distance: "28.0 km", mode: "Metro + Walk", congestion: "None" },
  ],
  "Airport-Tahlia Street": [
    { type: "Fastest", time: "30 min", distance: "24.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "38 min", distance: "25.5 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "48 min", distance: "24.0 km", mode: "Metro + Bus", congestion: "None" },
  ],
  "Airport-Al Rawdah": [
    { type: "Fastest", time: "28 min", distance: "22.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "36 min", distance: "23.5 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "45 min", distance: "22.0 km", mode: "Metro + Bus", congestion: "None" },
  ],
  "Airport-Exit 7 Ring Road": [
    { type: "Fastest", time: "25 min", distance: "20.0 km", mode: "Car", congestion: "Low" },
    { type: "Recommended", time: "32 min", distance: "21.5 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "42 min", distance: "20.0 km", mode: "Metro + Walk", congestion: "None" },
  ],
  "Airport-Al Muruj": [
    { type: "Fastest", time: "32 min", distance: "26.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "40 min", distance: "27.5 km", mode: "Metro Line 1", congestion: "Low" },
    { type: "Eco", time: "50 min", distance: "26.0 km", mode: "Metro + Bus", congestion: "None" },
  ],
  "Al Nakheel-KAFD": [
    { type: "Fastest", time: "22 min", distance: "14.5 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "28 min", distance: "15.2 km", mode: "Metro Line 4", congestion: "Low" },
    { type: "Eco", time: "38 min", distance: "14.0 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Nakheel-Tahlia Street": [
    { type: "Fastest", time: "18 min", distance: "11.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "24 min", distance: "11.8 km", mode: "Metro Line 4", congestion: "Low" },
    { type: "Eco", time: "32 min", distance: "10.5 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Nakheel-Al Rawdah": [
    { type: "Fastest", time: "20 min", distance: "13.0 km", mode: "Car", congestion: "Moderate" },
    { type: "Recommended", time: "26 min", distance: "14.0 km", mode: "Metro Line 4", congestion: "Low" },
    { type: "Eco", time: "35 min", distance: "12.5 km", mode: "Bus", congestion: "None" },
  ],
  "Al Nakheel-Exit 7 Ring Road": [
    { type: "Fastest", time: "15 min", distance: "9.5 km", mode: "Car", congestion: "Low" },
    { type: "Recommended", time: "20 min", distance: "10.2 km", mode: "Metro Line 4", congestion: "Low" },
    { type: "Eco", time: "28 min", distance: "9.0 km", mode: "Bus + Walk", congestion: "None" },
  ],
  "Al Nakheel-Al Muruj": [
    { type: "Fastest", time: "25 min", distance: "16.0 km", mode: "Car", congestion: "High" },
    { type: "Recommended", time: "32 min", distance: "17.0 km", mode: "Metro Line 4", congestion: "Low" },
    { type: "Eco", time: "42 min", distance: "15.5 km", mode: "Bus", congestion: "None" },
  ],
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [routeResult, setRouteResult] = useState(null);

  const getCongestionColor = (value) => {
    if (value >= 80) return '#FF4444';
    if (value >= 60) return '#FF8C00';
    if (value >= 40) return '#FFD700';
    return '#00CC44';
  };

  const getCongestionLabel = (value) => {
    if (value >= 80) return 'Critical';
    if (value >= 60) return 'High';
    if (value >= 40) return 'Moderate';
    return 'Low';
  };

  const handleRouteSearch = () => {
    if (selectedFrom && selectedTo) {
      const key = `${selectedFrom}-${selectedTo}`;
      const reverseKey = `${selectedTo}-${selectedFrom}`;
      const options = routeDatabase[key] || routeDatabase[reverseKey] || [
        { type: "Fastest", time: "20 min", distance: "12.0 km", mode: "Car", congestion: "Moderate" },
        { type: "Recommended", time: "28 min", distance: "13.0 km", mode: "Metro", congestion: "Low" },
        { type: "Eco", time: "35 min", distance: "11.5 km", mode: "Bus + Walk", congestion: "None" },
      ];
      setRouteResult({ options });
    }
  };

  const currentHour = new Date().getHours();
  const idx = Math.min(Math.max(currentHour - 6, 0), trafficData.length - 1);
  const currentTraffic = trafficData[idx];

  return (
    <div className="app">

      <header className="header">
        <div className="header-left">
          <div className="logo-text">
            <span className="logo-main">Masaar</span>
            <span className="logo-sub">Smart</span>
            <span className="logo-ar">مسار</span>
          </div>
          <p className="header-tagline">Riyadh Intelligent Mobility Platform</p>
        </div>
        <div className="header-right">
          <div className="live-indicator">
            <span className="live-dot"></span>
            Live
          </div>
        </div>
      </header>

      <nav className="nav">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'traffic', label: 'Traffic Prediction' },
          { id: 'metro', label: 'Metro Lines' },
          { id: 'ev', label: 'EV Charging' },
          { id: 'routes', label: 'Route Optimizer' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main">

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="section-title">Live City Overview - Riyadh</h2>
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: getCongestionColor(currentTraffic.congestion) }}>
                  {currentTraffic.congestion}%
                </div>
                <div className="kpi-label">Current Congestion</div>
                <div className="kpi-sub">{getCongestionLabel(currentTraffic.congestion)}</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#00CC44' }}>
                  {currentTraffic.speed} km/h
                </div>
                <div className="kpi-label">Avg Speed</div>
                <div className="kpi-sub">City Wide</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#FF8C00' }}>
                  {currentTraffic.incidents}
                </div>
                <div className="kpi-label">Active Incidents</div>
                <div className="kpi-sub">Reported Now</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#1E90FF' }}>
                  {evStations.reduce((sum, s) => sum + s.available, 0)}
                </div>
                <div className="kpi-label">EV Chargers Available</div>
                <div className="kpi-sub">Across {evStations.length} stations</div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3>Traffic Congestion - Today</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                    <XAxis dataKey="hour" stroke="#888" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ background: '#0f2035', border: '1px solid #C9A84C' }} />
                    <Line type="monotone" dataKey="congestion" stroke="#FF8C00" strokeWidth={2} dot={false} name="Congestion %" />
                    <Line type="monotone" dataKey="speed" stroke="#00CC44" strokeWidth={2} dot={false} name="Speed km/h" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-card">
                <h3>Congestion by District</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={districtData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                    <XAxis dataKey="district" stroke="#888" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ background: '#0f2035', border: '1px solid #C9A84C' }} />
                    <Bar dataKey="congestion" name="Congestion %">
                      {districtData.map((entry, index) => (
                        <Cell key={index} fill={getCongestionColor(entry.congestion)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="alert-card">
              <strong>Peak Hours Alert:</strong> Expect critical congestion on King Fahd Road and Olaya Street between 7-9 AM and 4-7 PM. Use Metro Line 1 or Ring Road alternatives.
            </div>
          </div>
        )}

        {activeTab === 'traffic' && (
          <div>
            <h2 className="section-title">Traffic Congestion Prediction</h2>
            <div className="chart-card">
              <h3>Hourly Congestion Forecast</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                  <XAxis dataKey="hour" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ background: '#0f2035', border: '1px solid #C9A84C' }} />
                  <Legend />
                  <Line type="monotone" dataKey="congestion" stroke="#FF8C00" strokeWidth={2} name="Congestion %" />
                  <Line type="monotone" dataKey="speed" stroke="#00CC44" strokeWidth={2} name="Avg Speed (km/h)" />
                  <Line type="monotone" dataKey="incidents" stroke="#FF4444" strokeWidth={2} name="Incidents" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="district-grid">
              {districtData.map((d, i) => (
                <div key={i} className="district-card">
                  <div className="district-name">{d.district}</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${d.congestion}%`, background: getCongestionColor(d.congestion) }}></div>
                  </div>
                  <div className="district-stats">
                    <span style={{ color: getCongestionColor(d.congestion) }}>{d.congestion}% - {getCongestionLabel(d.congestion)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'metro' && (
          <div>
            <h2 className="section-title">Riyadh Metro Network</h2>
            <div className="metro-grid">
              {metroLines.map(line => (
                <div key={line.id} className="metro-card" style={{ borderLeft: `4px solid ${line.color}` }}>
                  <div className="metro-name" style={{ color: line.color }}>{line.name}</div>
                  <div className="metro-name-ar">{line.nameAr}</div>
                  <div className="metro-stats">
                    <span>{line.stations} Stations</span>
                    <span>{line.length}</span>
                  </div>
                  <div className="metro-status">
                    <span className="status-dot"></span>
                    Operational
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-card" style={{ marginTop: '2rem' }}>
              <h3>Metro vs Car Travel Time (minutes)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { route: 'Al Olaya to KAFD', metro: 18, car: 35 },
                  { route: 'Airport to Center', metro: 32, car: 55 },
                  { route: 'Al Malaz to Olaya', metro: 22, car: 40 },
                  { route: 'King Fahd to Tahlia', metro: 15, car: 28 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                  <XAxis dataKey="route" stroke="#888" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ background: '#0f2035', border: '1px solid #C9A84C' }} />
                  <Legend />
                  <Bar dataKey="metro" fill="#1E90FF" name="Metro (min)" />
                  <Bar dataKey="car" fill="#FF8C00" name="Car (min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'ev' && (
          <div>
            <h2 className="section-title">EV Charging Stations - Riyadh</h2>
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#00CC44' }}>{evStations.reduce((sum, s) => sum + s.available, 0)}</div>
                <div className="kpi-label">Available Chargers</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#FF8C00' }}>{evStations.reduce((sum, s) => sum + s.chargers - s.available, 0)}</div>
                <div className="kpi-label">In Use</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#1E90FF' }}>{evStations.length}</div>
                <div className="kpi-label">Total Stations</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value" style={{ color: '#9B59B6' }}>
                  {Math.round(evStations.reduce((sum, s) => sum + s.available, 0) / evStations.reduce((sum, s) => sum + s.chargers, 0) * 100)}%
                </div>
                <div className="kpi-label">Availability Rate</div>
              </div>
            </div>
            <div className="ev-grid">
              {evStations.map(station => (
                <div key={station.id} className="ev-card">
                  <div className="ev-name">{station.name}</div>
                  <div className="ev-name-ar">{station.nameAr}</div>
                  <div className="ev-district">{station.district}</div>
                  <div className="ev-type">{station.type} Charging</div>
                  <div className="ev-availability">
                    <div className="ev-available" style={{ color: station.available > 0 ? '#00CC44' : '#FF4444' }}>
                      {station.available} / {station.chargers} Available
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(station.available / station.chargers) * 100}%`, background: station.available > 0 ? '#00CC44' : '#FF4444' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'routes' && (
          <div>
            <h2 className="section-title">Smart Route Optimizer</h2>
            <div className="route-form">
              <div className="route-inputs">
                <select className="route-select" value={selectedFrom} onChange={e => { setSelectedFrom(e.target.value); setRouteResult(null); }}>
                  <option value="">Select starting point...</option>
                  <option>King Fahd Road</option>
                  <option>Al Olaya</option>
                  <option>Al Malaz</option>
                  <option>Airport</option>
                  <option>Al Nakheel</option>
                </select>
                <span className="route-arrow">to</span>
                <select className="route-select" value={selectedTo} onChange={e => { setSelectedTo(e.target.value); setRouteResult(null); }}>
                  <option value="">Select destination...</option>
                  <option>KAFD</option>
                  <option>Tahlia Street</option>
                  <option>Al Rawdah</option>
                  <option>Exit 7 Ring Road</option>
                  <option>Al Muruj</option>
                </select>
                <button className="route-btn" onClick={handleRouteSearch}>Find Routes</button>
              </div>
            </div>

            {routeResult && (
              <div className="route-results">
                <h3>Route Options: {selectedFrom} to {selectedTo}</h3>
                {routeResult.options.map((option, i) => (
                  <div key={i} className={`route-option ${option.type === 'Recommended' ? 'recommended' : ''}`}>
                    <div className="route-option-header">
                      <span className="route-type">{option.type}</span>
                      {option.type === 'Recommended' && <span className="recommended-badge">Best Choice</span>}
                    </div>
                    <div className="route-details">
                      <span>Time: {option.time}</span>
                      <span>Distance: {option.distance}</span>
                      <span>Mode: {option.mode}</span>
                      <span style={{ color: option.congestion === 'Low' ? '#00CC44' : option.congestion === 'High' ? '#FF4444' : option.congestion === 'None' ? '#888' : '#FFD700' }}>
                        Traffic: {option.congestion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!routeResult && (
              <div className="tip-card">
                Select a starting point and destination above then click Find Routes to see smart route options.
              </div>
            )}
          </div>
        )}

      </main>

      <footer className="footer">
        <p>Masaar Smart - Riyadh Intelligent Mobility - Vision 2030 Smart City Initiative</p>
      </footer>

    </div>
  );
}

export default App;