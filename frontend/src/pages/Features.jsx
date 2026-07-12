import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Features from '../components/Features/Features'
import './Pages.css'

const FeaturesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page features-page">
      <Navbar />
      <div className="page-hero">
        <div className="container">
          <h1>Powerful Features</h1>
          <p>Everything you need to create self-healing user experiences.</p>
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  )
}

export default FeaturesPage