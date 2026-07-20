import api from './api'

// Save behaviour data
export const saveBehaviour = (data) => {
  return api.post('/behaviour/track', data)
}

// Get behaviour for a session
export const getBehaviour = (sessionId) => {
  return api.get(`/behaviour/${sessionId}`)
}

// Get friction for a session
export const getFriction = (sessionId) => {
  return api.get(`/behaviour/friction/${sessionId}`)
}

// Get all behaviour data
export const getAllBehaviour = () => {
  return api.get('/behaviour')
}

// Get behaviour summary
export const getBehaviourSummary = () => {
  return api.get('/behaviour/summary')
}