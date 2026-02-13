import { useState } from 'react'
import './Alerts.css'

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High Water Usage',
      message: 'Building A has exceeded normal usage levels by 35%',
      location: 'Building A',
      time: '2 hours ago',
      resolved: false,
    },
    {
      id: 2,
      type: 'error',
      title: 'System Malfunction',
      message: 'Sensor at Irrigation System not responding',
      location: 'Irrigation System',
      time: '5 hours ago',
      resolved: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Maintenance Required',
      message: 'Filter replacement due in Building C',
      location: 'Building C',
      time: '1 day ago',
      resolved: false,
    },
    {
      id: 4,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Routine maintenance completed successfully',
      location: 'Building B',
      time: '2 days ago',
      resolved: true,
    },
    {
      id: 5,
      type: 'warning',
      title: 'Low Water Pressure',
      message: 'Water pressure dropped below minimum threshold',
      location: 'Outdoor Area',
      time: '3 days ago',
      resolved: true,
    },
  ])

  const handleDismiss = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const handleResolve = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, resolved: true } : alert
    ))
  }

  const unresolved = alerts.filter(a => !a.resolved)
  const resolved = alerts.filter(a => a.resolved)

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Alerts & Notifications</h2>
        <p>Monitor and manage system alerts and notifications.</p>
      </header>

      {unresolved.length > 0 && (
        <div className="alerts-section">
          <h3>Active Alerts ({unresolved.length})</h3>
          <div className="alerts-list">
            {unresolved.map((alert) => (
              <div key={alert.id} className={`alert-card ${alert.type}`}>
                <div className="alert-header">
                  <span className="alert-icon">
                    {alert.type === 'warning' && '⚠️'}
                    {alert.type === 'error' && '❌'}
                    {alert.type === 'info' && 'ℹ️'}
                  </span>
                  <div className="alert-title-group">
                    <h4>{alert.title}</h4>
                    <p className="alert-meta">{alert.location} • {alert.time}</p>
                  </div>
                </div>
                <p className="alert-message">{alert.message}</p>
                <div className="alert-actions">
                  <button
                    className="btn-resolve"
                    onClick={() => handleResolve(alert.id)}
                  >
                    ✓ Mark Resolved
                  </button>
                  <button
                    className="btn-dismiss"
                    onClick={() => handleDismiss(alert.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {unresolved.length === 0 && (
        <div className="no-alerts">
          <span className="no-alerts-icon">✓</span>
          <h3>No Active Alerts</h3>
          <p>Your system is running smoothly!</p>
        </div>
      )}

      {resolved.length > 0 && (
        <div className="alerts-section resolved-section">
          <h3>Resolved Alerts ({resolved.length})</h3>
          <div className="alerts-list">
            {resolved.map((alert) => (
              <div key={alert.id} className="alert-card resolved">
                <div className="alert-header">
                  <span className="alert-icon">✓</span>
                  <div className="alert-title-group">
                    <h4>{alert.title}</h4>
                    <p className="alert-meta">{alert.location} • {alert.time}</p>
                  </div>
                </div>
                <p className="alert-message">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card alert-settings">
        <h3>Alert Settings</h3>
        <div className="settings-grid">
          <label className="setting-item">
            <input type="checkbox" defaultChecked />
            <span>High usage warnings</span>
          </label>
          <label className="setting-item">
            <input type="checkbox" defaultChecked />
            <span>System errors</span>
          </label>
          <label className="setting-item">
            <input type="checkbox" defaultChecked />
            <span>Maintenance reminders</span>
          </label>
          <label className="setting-item">
            <input type="checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
        </div>
      </div>
    </div>
  )
}
