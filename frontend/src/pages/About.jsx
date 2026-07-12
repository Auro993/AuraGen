import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Pages.css'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page about-page">
      <Navbar />
      <div className="page-hero">
        <div className="container">
          <h1>About AuraGen</h1>
          <p>Building interfaces that understand humans.</p>
        </div>
      </div>

      <div className="container">
        <div className="about-grid">
          <div className="about-card glass-card">
            <h3>🎯 Our Mission</h3>
            <p>
              AuraGen was born from a simple observation: traditional user interfaces are static,
              while human behavior is dynamic. We're building the next generation of adaptive UIs
              that respond to user emotions in real-time.
            </p>
          </div>

          <div className="about-card glass-card">
            <h3>🧠 The Technology</h3>
            <p>
              By combining cognitive load detection, generative AI, and real-time rendering,
              AuraGen creates self-healing interfaces that adapt to each user's needs.
              Our system uses GPT-4o, LangChain, and React to generate and inject
              personalized UIs on the fly.
            </p>
          </div>

          <div className="about-card glass-card">
            <h3>🌟 Our Vision</h3>
            <p>
              We envision a world where interfaces are not obstacles but partners.
              Where technology adapts to human behavior, not the other way around.
              AuraGen is the first step toward truly empathetic user experiences.
            </p>
          </div>

          <div className="about-card glass-card">
            <h3>❤️ Built With</h3>
            <div className="tech-stack">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">WebSocket</span>
              <span className="tech-tag">LangChain</span>
              <span className="tech-tag">GPT-4o</span>
              <span className="tech-tag">MongoDB</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About