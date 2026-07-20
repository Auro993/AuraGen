import React, { useState } from 'react'
import './TaxForm.css'

const TaxForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    pan: '',
    aadhaar: '',
    occupation: '',
    salary: '',
    taxRegime: 'old',
    investments: '',
    deductions: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone is required'
    if (!formData.pan) newErrors.pan = 'PAN is required'
    if (!formData.salary) newErrors.salary = 'Salary is required'
    return newErrors
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit(formData)
  }
  
  return (
    <form className="tax-form" onSubmit={handleSubmit}>
      <h2 className="tax-form-title">📋 Personal Details</h2>
      
      <div className="tax-form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>
      
      <div className="tax-form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      
      <div className="tax-form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>
      
      <div className="tax-form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      
      <div className="tax-form-group">
        <label>PAN Number</label>
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="Enter your PAN number"
          className={errors.pan ? 'error' : ''}
        />
        {errors.pan && <span className="error-text">{errors.pan}</span>}
      </div>
      
      <div className="tax-form-group">
        <label>Aadhaar Number</label>
        <input
          type="text"
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          placeholder="Enter your Aadhaar number"
        />
      </div>
      
      <div className="tax-form-group">
        <label>Occupation</label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
        >
          <option value="">Select occupation</option>
          <option value="salaried">Salaried</option>
          <option value="self-employed">Self-Employed</option>
          <option value="business">Business</option>
          <option value="freelancer">Freelancer</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="tax-form-group">
        <label>Annual Salary (₹)</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter your annual salary"
          className={errors.salary ? 'error' : ''}
        />
        {errors.salary && <span className="error-text">{errors.salary}</span>}
      </div>
      
      <div className="tax-form-group">
        <label>Tax Regime</label>
        <div className="tax-regime-options">
          <label className="regime-option">
            <input
              type="radio"
              name="taxRegime"
              value="old"
              checked={formData.taxRegime === 'old'}
              onChange={handleChange}
            />
            Old Regime
          </label>
          <label className="regime-option">
            <input
              type="radio"
              name="taxRegime"
              value="new"
              checked={formData.taxRegime === 'new'}
              onChange={handleChange}
            />
            New Regime
          </label>
        </div>
      </div>
      
      <div className="tax-form-group">
        <label>Investments (₹)</label>
        <input
          type="number"
          name="investments"
          value={formData.investments}
          onChange={handleChange}
          placeholder="Enter investment amount"
        />
      </div>
      
      <div className="tax-form-group">
        <label>Deductions (₹)</label>
        <input
          type="number"
          name="deductions"
          value={formData.deductions}
          onChange={handleChange}
          placeholder="Enter deductions amount"
        />
      </div>
      
      <button 
        type="submit" 
        className="btn-primary tax-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? '⏳ Processing...' : '📤 Submit Tax Form'}
      </button>
    </form>
  )
}

export default TaxForm