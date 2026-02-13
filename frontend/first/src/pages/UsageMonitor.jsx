import { useState } from 'react'
import './UsageMonitor.css'
import ChartPlaceholder from '../components/ChartPlaceholder'

export default function UsageMonitor() {
  const [selectedZone, setSelectedZone] = useState('all')
  const [timeRange, setTimeRange] = useState('week')

  const zones = [
    { id: 'all', name: 'All Zones', usage: 2450, units: 'L' },
    { id: 'building-a', name: 'Building A', usage: 450, units: 'L' },
    { id: 'building-b', name: 'Building B', usage: 380, units: 'L' },
    { id: 'building-c', name: 'Building C', usage: 320, units: 'L' },
    { id: 'outdoor', name: 'Outdoor Area', usage: 280, units: 'L' },
    { id: 'irrigation', name: 'Irrigation System', usage: 620, units: 'L' },
  ]

  const hourlyData = [
    { time: '00:00', usage: 10 },
    { time: '04:00', usage: 5 },
    { time: '08:00', usage: 45 },
    { time: '12:00', usage: 78 },
    { time: '16:00', usage: 65 },
    { time: '20:00', usage: 58 },
    { time: '23:00', usage: 15 },
  ]

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Usage Monitor</h2>
        <p>Track and analyze water usage across all zones and time periods.</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <label>Time Range:</label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="monitor-grid">
        <div className="card">
          <h3>Usage by Zone</h3>
          <div className="zone-buttons">
            {zones.map((zone) => (
              <button
                key={zone.id}
                className={`zone-button ${selectedZone === zone.id ? 'active' : ''}`}
                onClick={() => setSelectedZone(zone.id)}
              >
                <span className="zone-label">{zone.name}</span>
                <span className="zone-usage">{zone.usage}{zone.units}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="monitor-grid">
        <div className="card">
          <h3>Current Zone Usage: {zones.find(z => z.id === selectedZone)?.name}</h3>
          <ChartPlaceholder data={hourlyData} type="bar" />
        </div>

        <div className="card">
          <h3>Usage Statistics</h3>
          <div className="statistics">
            <div className="stat-row">
              <span className="stat-label">Peak Usage:</span>
              <span className="stat-value">125L at 12:00 PM</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Low Usage:</span>
              <span className="stat-value">5L at 04:00 AM</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Average Usage:</span>
              <span className="stat-value">45.3L per hour</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Total Daily:</span>
              <span className="stat-value">245.5L</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Efficiency Rate:</span>
              <span className="stat-value">92%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Hourly Breakdown</h3>
        <table className="usage-table">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Usage (L)</th>
              <th>% of Daily Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((data, idx) => (
              <tr key={idx}>
                <td>{data.time}</td>
                <td>{data.usage}</td>
                <td>{((data.usage / 245.5) * 100).toFixed(1)}%</td>
                <td>
                  <span className={`badge ${data.usage > 70 ? 'high' : data.usage < 20 ? 'low' : 'normal'}`}>
                    {data.usage > 70 ? '⬆️ High' : data.usage < 20 ? '⬇️ Low' : '→ Normal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
