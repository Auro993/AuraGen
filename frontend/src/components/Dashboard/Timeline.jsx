import React from 'react'

const Timeline = ({ events }) => {
  return (
    <div className="timeline-card glass-card">
      <h3 className="timeline-title">Friction Timeline</h3>
      <div className="timeline-list">
        {events.map((item, index) => (
          <div key={index} className="timeline-item">
            <span className="timeline-time">{item.time}</span>
            <span className="timeline-dot" style={{ background: item.color }}></span>
            <span className="timeline-event">{item.event}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline