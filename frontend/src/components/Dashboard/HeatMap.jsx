import React from 'react'

const HeatMap = ({ data }) => {
  const getColor = (intensity) => {
    if (intensity > 0.7) return '#7C5CFF'
    if (intensity > 0.4) return '#F59E0B'
    return '#22C55E'
  }

  return (
    <div className="heatmap-card glass-card">
      <h3 className="heatmap-title">Mouse Heatmap</h3>
      <div className="heatmap-grid">
        {data.map((cell, index) => (
          <div 
            key={index} 
            className="heatmap-cell"
            style={{ 
              background: getColor(cell.intensity),
              opacity: cell.intensity
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default HeatMap