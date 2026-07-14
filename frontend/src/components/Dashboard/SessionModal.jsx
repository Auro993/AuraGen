import React from 'react'
import './SessionModal.css'

const SessionModal = ({ session, isOpen, onClose }) => {
  if (!isOpen || !session) return null

  return (
    <div className="session-modal-overlay" onClick={onClose}>
      <div className="session-modal" onClick={(e) => e.stopPropagation()}>
        <div className="session-modal-header">
          <h2>Session Details</h2>
          <button className="session-modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="session-modal-body">
          <div className="session-modal-grid">
            <div className="session-modal-item">
              <span className="session-modal-label">Session</span>
              <span className="session-modal-value">{session.id}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">User</span>
              <span className="session-modal-value">{session.user}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Visited Pages</span>
              <span className="session-modal-value">{session.visitedPages?.join(' → ') || 'Dashboard'}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Friction Score</span>
              <span className="session-modal-value" style={{ color: session.friction > 70 ? '#EF4444' : session.friction > 40 ? '#F59E0B' : '#22C55E' }}>
                {session.friction}%
              </span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Mouse Distance</span>
              <span className="session-modal-value">{session.mouseDistance || 'N/A'}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Wrong Clicks</span>
              <span className="session-modal-value">{session.wrongClicks || 0}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Idle Time</span>
              <span className="session-modal-value">{session.idleTime || 'N/A'}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Generated UI</span>
              <span className="session-modal-value">{session.generatedUI || 'None'}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">AI Status</span>
              <span className="session-modal-value">{session.aiStatus || 'N/A'}</span>
            </div>
            <div className="session-modal-item">
              <span className="session-modal-label">Status</span>
              <span className="session-modal-value">{session.status}</span>
            </div>
          </div>
        </div>
        
        <div className="session-modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default SessionModal