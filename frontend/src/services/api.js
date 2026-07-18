import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
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
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Network error (no response from server)
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - server might be down')
      return Promise.reject({
        message: 'Cannot connect to server. Please check if backend is running.',
        isNetworkError: true
      })
    }
    
    // Server responded with error
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data)
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }
      
      // Handle 404 Not Found
      if (error.response.status === 404) {
        console.warn('API endpoint not found:', error.config.url)
      }
      
      // Handle 500 Internal Server Error
      if (error.response.status === 500) {
        console.error('Server error:', error.response.data)
      }
      
      return Promise.reject(error.response.data || { message: 'An error occurred' })
    }
    
    // Request was made but no response received
    if (error.request) {
      console.error('No response received:', error.request)
      return Promise.reject({
        message: 'No response from server. Please try again.',
        isNetworkError: true
      })
    }
    
    // Something else happened
    console.error('API Error:', error.message)
    return Promise.reject({ message: error.message || 'An unexpected error occurred' })
  }
)

// ============ AUTH API ============
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return api.post('/auth/logout')
  },
  me: () => api.get('/auth/me'),
}

// ============ DASHBOARD API ============
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getChart: () => api.get('/dashboard/chart'),
  getSessions: () => api.get('/dashboard/sessions'),
  getTimeline: () => api.get('/dashboard/timeline'),
  getLogs: () => api.get('/dashboard/logs'),
}

// ============ ANALYTICS API ============
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

// ============ SESSIONS API ============
export const sessionsAPI = {
  getAll: (params) => api.get('/sessions', { params }),
  getById: (id) => api.get(`/sessions/${id}`),
  update: (id, data) => api.put(`/sessions/${id}`, data),
  delete: (id) => api.delete(`/sessions/${id}`),
  getStats: () => api.get('/sessions/stats'),
}

// ============ BEHAVIOUR API ============
export const behaviourAPI = {
  getKPI: () => api.get('/behaviour/kpi'),
  getDistribution: () => api.get('/behaviour/distribution'),
  getInteractionTrend: () => api.get('/behaviour/interaction-trend'),
  getTriggers: () => api.get('/behaviour/triggers'),
  getTimeline: () => api.get('/behaviour/timeline'),
  getInsight: () => api.get('/behaviour/insight'),
}

// ============ FRICTION API ============
export const frictionAPI = {
  getOverview: () => api.get('/friction/overview'),
  getScore: () => api.get('/friction/score'),
  getTrend: () => api.get('/friction/trend'),
  getFactors: () => api.get('/friction/factors'),
  getEvents: () => api.get('/friction/events'),
  getRecommendation: () => api.get('/friction/recommendation'),
}

// ============ AI GENERATOR API ============
export const aiAPI = {
  generate: (data) => api.post('/ai/generate', data),
  getStatus: () => api.get('/ai/status'),
  getConfig: () => api.get('/ai/config'),
  updateConfig: (data) => api.put('/ai/config', data),
}

// ============ GENERATED UI API ============
export const generatedUIAPI = {
  getAll: () => api.get('/ui/generated'),
  getById: (id) => api.get(`/ui/generated/${id}`),
  apply: (id) => api.post(`/ui/apply/${id}`),
  compare: (id1, id2) => api.get(`/ui/compare/${id1}/${id2}`),
}

// ============ HISTORY API ============
export const historyAPI = {
  getAll: () => api.get('/history'),
  getById: (id) => api.get(`/history/${id}`),
  getTimeline: () => api.get('/history/timeline'),
}

// ============ SETTINGS API ============
export const settingsAPI = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),
  getProfile: () => api.get('/settings/profile'),
  updateProfile: (data) => api.put('/settings/profile', data),
}

// ============ HELP & DOCS API ============
export const docsAPI = {
  getArticles: () => api.get('/docs/articles'),
  getArticle: (id) => api.get(`/docs/articles/${id}`),
  getCategories: () => api.get('/docs/categories'),
  search: (query) => api.get('/docs/search', { params: { q: query } }),
}

// ============ USER API ============
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.post('/user/change-password', data),
}

export default api