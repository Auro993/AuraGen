import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Pages.css'

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const plans = [
    {
      name: 'Starter',
      description: 'For individuals & students',
      price: '$0',
      period: '/month',
      features: ['Up to 2,000 sessions', 'Basic analytics', 'Standard support'],
      popular: false
    },
    {
      name: 'Pro',
      description: 'For professionals',
      price: '$29',
      period: '/month',
      features: ['Up to 50,000 sessions', 'Advanced analytics', 'Priority support', 'Custom integrations'],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large teams',
      price: 'Custom',
      period: '',
      features: ['Unlimited sessions', 'Custom analytics', 'Dedicated support', 'SLA & Onboarding'],
      popular: false
    }
  ]

  return (
    <div className="page pricing-page">
      <Navbar />
      <div className="page-hero">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that's right for you.</p>
        </div>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card glass-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-price">
                {plan.price}
                <span className="period">{plan.period}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%' }}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : plan.name === 'Starter' ? 'Get Started' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Pricing