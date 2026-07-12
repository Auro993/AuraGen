import React from 'react'

const FrictionChart = ({ data }) => {
  return (
    <div className="chart-card glass-card">
      <h3 className="chart-title">User Friction Over Time</h3>
      <div className="chart-container">
        {data.map((value, index) => {
          const height = (value / 100) * 150
          const color = value > 70 ? '#EF4444' : value > 40 ? '#F59E0B' : '#22C55E'
          return (
            <div key={index} className="chart-bar-wrapper">
              <div 
                className="chart-bar" 
                style={{ 
                  height: `${height}px`,
                  background: color
                }}
              ></div>
              <span className="chart-label">{index + 1}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FrictionChart