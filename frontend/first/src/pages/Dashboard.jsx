import { useState, useEffect } from 'react'
import './Dashboard.css'
import StatCard from '../components/StatCard'
import ChartPlaceholder from '../components/ChartPlaceholder'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsage: 2450,
    dailyUsage: 245.5,
    waterQuality: 92,
    systemHealth: 98,
  })

  const [usageTrend, setUsageTrend] = useState([
    { day: 'Mon', usage: 210 },
    { day: 'Tue', usage: 220 },
    { day: 'Wed', usage: 205 },
    { day: 'Thu', usage: 240 },
    { day: 'Fri', usage: 245 },
    { day: 'Sat', usage: 230 },
    { day: 'Sun', usage: 245 },
  ])

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's your water management overview.</p>
      </header>

      <div className="stats-grid">
        <StatCard
          title="Total Usage (L)"
          value={stats.totalUsage}
          icon="📊"
          trend="+12%"
          color="blue"
        />
        <StatCard
          title="Daily Average (L)"
          value={stats.dailyUsage}
          icon="📈"
          trend="+5%"
          color="green"
        />
        <StatCard
          title="Water Quality (%)"
          value={stats.waterQuality}
          icon="💧"
          trend="+2%"
          color="cyan"
        />
        <StatCard
          title="System Health (%)"
          value={stats.systemHealth}
          icon="⚙️"
          trend="Stable"
          color="purple"
        />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Usage Trend (7 Days)</h3>
          <ChartPlaceholder data={usageTrend} type="line" />
        </div>

        <div className="card">
          <h3>Top Locations</h3>
          <div className="locations-list">
            <div className="location-item">
              <div className="location-info">
                <span className="location-name">Building A</span>
                <span className="location-usage">450L</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="location-item">
              <div className="location-info">
                <span className="location-name">Building B</span>
                <span className="location-usage">380L</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="location-item">
              <div className="location-info">
                <span className="location-name">Building C</span>
                <span className="location-usage">320L</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '55%' }}></div>
              </div>
            </div>
            <div className="location-item">
              <div className="location-info">
                <span className="location-name">Outdoor Area</span>
                <span className="location-usage">280L</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '48%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <table className="activity-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Event</th>
              <th>Usage (L)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2:45 PM</td>
              <td>Building A</td>
              <td>High usage detected</td>
              <td>125</td>
              <td><span className="status warning">⚠️ Alert</span></td>
            </tr>
            <tr>
              <td>2:30 PM</td>
              <td>Building C</td>
              <td>Normal operation</td>
              <td>45</td>
              <td><span className="status normal">✓ OK</span></td>
            </tr>
            <tr>
              <td>2:15 PM</td>
              <td>Outdoor Area</td>
              <td>Maintenance complete</td>
              <td>0</td>
              <td><span className="status success">✓ Done</span></td>
            </tr>
            <tr>
              <td>2:00 PM</td>
              <td>Building B</td>
              <td>Normal operation</td>
              <td>78</td>
              <td><span className="status normal">✓ OK</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
