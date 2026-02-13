import { useState } from 'react'
import './Reports.css'
import ChartPlaceholder from '../components/ChartPlaceholder'

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('monthly')
  const [exportFormat, setExportFormat] = useState('pdf')

  const monthlyData = [
    { month: 'Jan', usage: 7200 },
    { month: 'Feb', usage: 6800 },
    { month: 'Mar', usage: 7500 },
    { month: 'Apr', usage: 6200 },
    { month: 'May', usage: 8100 },
    { month: 'Jun', usage: 9200 },
  ]

  const reports = [
    {
      id: 'monthly',
      title: 'Monthly Usage Report',
      description: 'Comprehensive monthly water consumption analysis',
      generated: '2 days ago',
      size: '2.4 MB',
    },
    {
      id: 'quarterly',
      title: 'Quarterly Performance Report',
      description: 'Quarterly trends and efficiency metrics',
      generated: '1 week ago',
      size: '3.1 MB',
    },
    {
      id: 'annual',
      title: 'Annual Summary Report',
      description: 'Year-to-date comprehensive analysis',
      generated: '1 month ago',
      size: '5.8 MB',
    },
    {
      id: 'leak',
      title: 'Leak Detection Report',
      description: 'Anomalies and potential leak locations',
      generated: '5 days ago',
      size: '1.2 MB',
    },
  ]

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Reports</h2>
        <p>Generate and access water management reports and analytics.</p>
      </header>

      <div className="reports-grid">
        <div className="card">
          <h3>Generate Report</h3>
          <div className="report-options">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`report-option ${selectedReport === report.id ? 'selected' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <h4>{report.title}</h4>
                <p>{report.description}</p>
                <span className="report-meta">{report.generated} • {report.size}</span>
              </div>
            ))}
          </div>
          <div className="export-controls">
            <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <option value="pdf">PDF Format</option>
              <option value="csv">CSV Format</option>
              <option value="excel">Excel Format</option>
            </select>
            <button className="btn-export">📥 Export Report</button>
          </div>
        </div>

        <div className="card">
          <h3>Quick Stats</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Total Usage (6 months)</span>
              <span className="stat-number">45,000 L</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Monthly</span>
              <span className="stat-number">7,500 L</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Peak Month</span>
              <span className="stat-number">9,200 L (Jun)</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Lowest Month</span>
              <span className="stat-number">6,200 L (Apr)</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Overall Efficiency</span>
              <span className="stat-number">91%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Usage Trends (Last 6 Months)</h3>
        <ChartPlaceholder data={monthlyData} type="line" />
      </div>

      <div className="reports-grid">
        <div className="card">
          <h3>Consumption by Zone</h3>
          <div className="zone-breakdown">
            <div className="zone-item">
              <div className="zone-info">
                <span className="zone-name">Building A</span>
                <span className="zone-percentage">35%</span>
              </div>
              <div className="zone-bar">
                <div className="zone-fill" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div className="zone-item">
              <div className="zone-info">
                <span className="zone-name">Building B</span>
                <span className="zone-percentage">28%</span>
              </div>
              <div className="zone-bar">
                <div className="zone-fill" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div className="zone-item">
              <div className="zone-info">
                <span className="zone-name">Building C</span>
                <span className="zone-percentage">22%</span>
              </div>
              <div className="zone-bar">
                <div className="zone-fill" style={{ width: '22%' }}></div>
              </div>
            </div>
            <div className="zone-item">
              <div className="zone-info">
                <span className="zone-name">Irrigation</span>
                <span className="zone-percentage">15%</span>
              </div>
              <div className="zone-bar">
                <div className="zone-fill" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Compliance Status</h3>
          <div className="compliance-items">
            <div className="compliance-item pass">
              <span className="compliance-icon">✓</span>
              <div className="compliance-info">
                <h4>Usage Limits</h4>
                <p>Within allocated limits</p>
              </div>
            </div>
            <div className="compliance-item pass">
              <span className="compliance-icon">✓</span>
              <div className="compliance-info">
                <h4>Quality Standards</h4>
                <p>All tests passed</p>
              </div>
            </div>
            <div className="compliance-item pass">
              <span className="compliance-icon">✓</span>
              <div className="compliance-info">
                <h4>Maintenance Schedule</h4>
                <p>On track</p>
              </div>
            </div>
            <div className="compliance-item warning">
              <span className="compliance-icon">!</span>
              <div className="compliance-info">
                <h4>Peak Usage</h4>
                <p>Monitor June patterns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Reports</h3>
        <table className="reports-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Generated</th>
              <th>Period</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>June Monthly Report</td>
              <td>2 days ago</td>
              <td>Jun 1 - 30, 2025</td>
              <td>2.4 MB</td>
              <td><button className="link-button">Download</button></td>
            </tr>
            <tr>
              <td>Q2 Quarterly Report</td>
              <td>1 week ago</td>
              <td>Apr 1 - Jun 30, 2025</td>
              <td>3.1 MB</td>
              <td><button className="link-button">Download</button></td>
            </tr>
            <tr>
              <td>May Monthly Report</td>
              <td>1 month ago</td>
              <td>May 1 - 31, 2025</td>
              <td>2.2 MB</td>
              <td><button className="link-button">Download</button></td>
            </tr>
            <tr>
              <td>Leak Detection Report</td>
              <td>5 days ago</td>
              <td>System-wide Scan</td>
              <td>1.2 MB</td>
              <td><button className="link-button">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
