import './StatCard.css'

export default function StatCard({ title, value, icon, trend, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h4>{title}</h4>
        <div className="stat-value-group">
          <span className="stat-main-value">{value}</span>
          <span className="stat-trend">{trend}</span>
        </div>
      </div>
    </div>
  )
}
