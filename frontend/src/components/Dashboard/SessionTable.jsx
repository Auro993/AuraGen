import React from 'react'

const SessionTable = ({ sessions }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#22C55E';
      default: return '#9CA3AF';
    }
  }

  return (
    <div className="sessions-card glass-card">
      <h3 className="sessions-title">Recent User Sessions</h3>
      <table className="sessions-table">
        <thead>
          <tr>
            <th>Session ID</th>
            <th>User</th>
            <th>Friction Score</th>
            <th>Status</th>
            <th>Generated UI</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session.id}</td>
              <td>{session.user}</td>
              <td className="friction-value">{session.friction}</td>
              <td>
                <span 
                  className="status-badge" 
                  style={{ 
                    background: `${getStatusColor(session.status)}20`, 
                    color: getStatusColor(session.status) 
                  }}
                >
                  {session.status}
                </span>
              </td>
              <td>{session.generated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SessionTable