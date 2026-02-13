import './ChartPlaceholder.css'

export default function ChartPlaceholder({ data, type }) {
  const maxValue = Math.max(...data.map(d => d.usage || parseInt(d.usage)))

  if (type === 'line') {
    return (
      <div className="chart-placeholder">
        <svg className="line-chart" viewBox="0 0 700 300">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="700" y2="50" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="100" x2="700" y2="100" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="150" x2="700" y2="150" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="200" x2="700" y2="200" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="250" x2="700" y2="250" stroke="#ecf0f1" strokeWidth="1" />

          {/* Line */}
          <polyline
            points={data
              .map((d, i) => {
                const x = (i / (data.length - 1)) * 650 + 25
                const y = 250 - (d.usage / maxValue) * 200
                return `${x},${y}`
              })
              .join(' ')}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 650 + 25
            const y = 250 - (d.usage / maxValue) * 200
            return (
              <circle key={i} cx={x} cy={y} r="5" fill="#667eea" />
            )
          })}

          {/* Gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
              <stop offset="100%" stopColor="#764ba2" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Axis */}
          <line x1="25" y1="25" x2="25" y2="250" stroke="#333" strokeWidth="2" />
          <line x1="25" y1="250" x2="700" y2="250" stroke="#333" strokeWidth="2" />
        </svg>
        <div className="chart-legend">
          {data.map((d, i) => (
            <span key={i} className="legend-item">
              {d.day || d.month}: {d.usage}L
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div className="chart-placeholder">
        <svg className="bar-chart" viewBox="0 0 700 300">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="700" y2="50" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="100" x2="700" y2="100" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="150" x2="700" y2="150" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="200" x2="700" y2="200" stroke="#ecf0f1" strokeWidth="1" />
          <line x1="0" y1="250" x2="700" y2="250" stroke="#ecf0f1" strokeWidth="1" />

          {/* Bars */}
          {data.map((d, i) => {
            const barWidth = 60
            const x = 50 + i * 90
            const height = (d.usage / maxValue) * 200
            const y = 250 - height

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill="url(#barGradient)"
                  rx="4"
                />
              </g>
            )
          })}

          {/* Gradient */}
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>

          {/* Axis */}
          <line x1="25" y1="25" x2="25" y2="250" stroke="#333" strokeWidth="2" />
          <line x1="25" y1="250" x2="700" y2="250" stroke="#333" strokeWidth="2" />
        </svg>
        <div className="chart-legend">
          {data.map((d, i) => (
            <span key={i} className="legend-item">
              {d.time}: {d.usage}L
            </span>
          ))}
        </div>
      </div>
    )
  }

  return null
}
