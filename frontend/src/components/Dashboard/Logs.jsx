import React, { useRef, useEffect } from 'react'

const Logs = ({ logs }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="logs-card glass-card">
      <h3 className="logs-title">System Log</h3>
      <div className="logs-container" ref={containerRef}>
        {logs.map((log, index) => (
          <div key={index} className={`log-item ${log.type}`}>
            <span className="log-time">{log.time}</span>
            <span className="log-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logs