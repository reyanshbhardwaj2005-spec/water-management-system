import { useState } from 'react'
import './Settings.css'

export default function Settings() {
  const [settings, setSettings] = useState({
    organization: 'Water Management Corp',
    email: 'admin@watermanagement.com',
    phone: '+1-555-0123',
    timezone: 'EST',
    language: 'English',
    theme: 'light',
    notifications: true,
    emailAlerts: true,
    dailyReports: false,
    autoBackup: true,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Settings</h2>
        <p>Manage system configuration and preferences.</p>
      </header>

      {saved && (
        <div className="success-message">
          ✓ Settings saved successfully!
        </div>
      )}

      <div className="settings-container">
        <div className="settings-card">
          <h3>Organization Settings</h3>
          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              value={settings.organization}
              onChange={(e) => handleChange('organization', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="settings-card">
          <h3>Regional Settings</h3>
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
            >
              <option>EST</option>
              <option>CST</option>
              <option>MST</option>
              <option>PST</option>
              <option>UTC</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>

        <div className="settings-card">
          <h3>Notification Settings</h3>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
            />
            <span>Enable system notifications</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => handleChange('emailAlerts', e.target.checked)}
            />
            <span>Send email alerts for critical issues</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={settings.dailyReports}
              onChange={(e) => handleChange('dailyReports', e.target.checked)}
            />
            <span>Send daily usage reports</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => handleChange('autoBackup', e.target.checked)}
            />
            <span>Enable automatic data backup</span>
          </label>
        </div>

        <div className="settings-card">
          <h3>System Information</h3>
          <div className="info-item">
            <span className="info-label">System Version</span>
            <span className="info-value">2.1.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Updated</span>
            <span className="info-value">February 10, 2026</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database Size</span>
            <span className="info-value">1.2 GB</span>
          </div>
          <div className="info-item">
            <span className="info-label">API Endpoint</span>
            <span className="info-value">api.watermanagement.local</span>
          </div>
        </div>

        <div className="settings-card">
          <h3>Data Management</h3>
          <button className="btn-secondary">📊 Export Data</button>
          <button className="btn-secondary">🔄 Backup Now</button>
          <button className="btn-danger">🗑️ Clear Cache</button>
        </div>

        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>
            ✓ Save Settings
          </button>
          <button className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  )
}
