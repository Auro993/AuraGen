import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Features from './pages/Features'
import Architecture from './pages/Architecture'
import Demo from './pages/Demo'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import UserSessions from './pages/UserSessions'
import Behaviour from './pages/Behaviour'
import FrictionEngine from './pages/FrictionEngine'
import AIGenerator from './pages/AIGenerator'
import GeneratedUI from './pages/GeneratedUI'
import History from './pages/History'
import DemoPortal from './pages/DemoPortal'
import Settings from './pages/Settings'
import HelpDocs from './pages/HelpDocs'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import './styles/global.css'
import './styles/variables.css'
import './styles/animations.css'
import './styles/utilities.css'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111827',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '16px 20px',
          },
          success: {
            icon: '✅',
            style: {
              background: '#111827',
              color: '#22C55E',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            },
          },
          error: {
            icon: '❌',
            style: {
              background: '#111827',
              color: '#EF4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/user-sessions" element={<UserSessions />} />
        <Route path="/behavior" element={<Behaviour />} />
        <Route path="/friction" element={<FrictionEngine />} />
        <Route path="/ai" element={<AIGenerator />} />
        <Route path="/generated" element={<GeneratedUI />} />
        <Route path="/history" element={<History />} />
        <Route path="/demo-portal" element={<DemoPortal />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/docs" element={<HelpDocs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App