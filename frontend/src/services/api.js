import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getChart: () => api.get('/dashboard/chart'),
  getSessions: () => api.get('/dashboard/sessions'),
  getTimeline: () => api.get('/dashboard/timeline'),
  getLogs: () => api.get('/dashboard/logs'),
}

// Analytics API
export const analyticsAPI = {
  getOverview: () => api.get('/analytics/overview'),
  getFrictionTrend: () => api.get('/analytics/friction-trend'),
  getBehaviour: () => api.get('/analytics/behaviour'),
  getProblematicPages: () => api.get('/analytics/problematic-pages'),
  getSessions: () => api.get('/analytics/sessions'),
  getHeatmap: () => api.get('/analytics/heatmap'),
  getAIStats: () => api.get('/analytics/ai-stats'),
  getFrictionSources: () => api.get('/analytics/friction-sources'),
  getAIPerformance: () => api.get('/analytics/ai-performance'),
}

// Sessions API
export const sessionsAPI = {
  getAll: (params) => api.get('/sessions', { params }),
  getById: (id) => api.get(`/sessions/${id}`),
  update: (id, data) => api.put(`/sessions/${id}`, data),
  delete: (id) => api.delete(`/sessions/${id}`),
}

// Friction API
export const frictionAPI = {
  getOverview: () => api.get('/friction/overview'),
  getScore: () => api.get('/friction/score'),
  getTrend: () => api.get('/friction/trend'),
  getFactors: () => api.get('/friction/factors'),
  getEvents: () => api.get('/friction/events'),
  getRecommendation: () => api.get('/friction/recommendation'),
}

// AI Generator API
export const aiAPI = {
  generate: (data) => api.post('/ai/generate', data),
  getStatus: () => api.get('/ai/status'),
  getConfig: () => api.get('/ai/config'),
  updateConfig: (data) => api.put('/ai/config', data),
}

// Generated UI API
export const generatedUIAPI = {
  getAll: () => api.get('/ui/generated'),
  getById: (id) => api.get(`/ui/generated/${id}`),
  apply: (id) => api.post(`/ui/apply/${id}`),
  compare: (id1, id2) => api.get(`/ui/compare/${id1}/${id2}`),
}

// History API
export const historyAPI = {
  getAll: () => api.get('/history'),
  getById: (id) => api.get(`/history/${id}`),
  getTimeline: () => api.get('/history/timeline'),
}

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}

export default api