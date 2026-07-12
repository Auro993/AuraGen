import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'
import './Pages.css'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default Home