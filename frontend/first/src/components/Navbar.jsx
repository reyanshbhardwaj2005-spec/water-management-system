import './Navbar.css'

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="menu-toggle" onClick={onMenuClick}>
          ☰
        </button>
        <div className="navbar-logo">
          <span className="logo-icon">💧</span>
          <h1>WaterFlow Management System</h1>
        </div>
        <div className="navbar-user">
          <span className="user-icon">👤</span>
          <span className="user-name">Admin User</span>
        </div>
      </div>
    </nav>
  )
}
