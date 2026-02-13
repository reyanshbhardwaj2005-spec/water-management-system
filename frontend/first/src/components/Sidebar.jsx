import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ isOpen }) {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/usage', label: 'Usage Monitor', icon: '📈' },
    { path: '/alerts', label: 'Alerts', icon: '🔔' },
    { path: '/reports', label: 'Reports', icon: '📋' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="nav-link">
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="footer-item">
          <span className="footer-icon">ℹ️</span>
          <div className="footer-text">
            <p className="footer-title">System Status</p>
            <p className="footer-status">Active</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
