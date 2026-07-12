import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import './Pages.css'

const Login = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isLogin 
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register'

      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      const response = await axios.post(url, payload)
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card glass-card">
          <div className="login-header">
            <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
            <p>{isLogin ? 'Sign in to your account' : 'Start your journey with AuraGen'}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary login-submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            <p className="login-switch">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span 
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ name: '', email: '', password: '' })
                }}
              >
                {isLogin ? ' Sign up' : ' Sign in'}
              </span>
            </p>

            <div className="login-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn">Google</button>
              <button type="button" className="social-btn">GitHub</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login