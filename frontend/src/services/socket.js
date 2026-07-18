import { io } from 'socket.io-client'

// Socket instance
let socket = null

// Initialize socket connection
export const connectSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000
    })

    socket.on('connect', () => {
      console.log('✅ WebSocket connected')
    })

    socket.on('connect_error', (error) => {
      console.error('❌ WebSocket connection error:', error)
    })

    socket.on('disconnect', () => {
      console.log('🔌 WebSocket disconnected')
    })
  }
  return socket
}

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

// Join a session
export const joinSession = (sessionId) => {
  if (socket) {
    socket.emit('join-session', sessionId)
  }
}

// Leave a session
export const leaveSession = (sessionId) => {
  if (socket) {
    socket.emit('leave-session', sessionId)
  }
}

// Send friction event
export const sendFrictionEvent = (data) => {
  if (socket) {
    socket.emit('friction-event', data)
  }
}

// Start friction updates
export const startFrictionUpdates = (sessionId) => {
  if (socket) {
    socket.emit('start-friction-updates', sessionId)
  }
}

// Stop friction updates
export const stopFrictionUpdates = () => {
  if (socket) {
    socket.emit('stop-friction-updates')
  }
}

// Get socket instance
export const getSocket = () => socket

// Event listeners
export const onFrictionUpdate = (callback) => {
  if (socket) {
    socket.on('frictionUpdate', callback)
  }
}

export const onFrictionScore = (callback) => {
  if (socket) {
    socket.on('friction-score', callback)
  }
}

export const onUIGenerated = (callback) => {
  if (socket) {
    socket.on('ui-generated', callback)
  }
}

export const onWelcome = (callback) => {
  if (socket) {
    socket.on('welcome', callback)
  }
}

export const onError = (callback) => {
  if (socket) {
    socket.on('error', callback)
  }
}

export default {
  connectSocket,
  disconnectSocket,
  joinSession,
  leaveSession,
  sendFrictionEvent,
  startFrictionUpdates,
  stopFrictionUpdates,
  getSocket,
  onFrictionUpdate,
  onFrictionScore,
  onUIGenerated,
  onWelcome,
  onError
}