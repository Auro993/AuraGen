// frontend/src/App.jsx

import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

// Public Pages
import Home from './pages/Home'
import Features from './pages/Features'
import Architecture from './pages/Architecture'
import Demo from './pages/Demo'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

// Dashboard Pages
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
import Profile from './pages/Profile'  // ✅ NEW: Profile page import

// Styles
import './styles/global.css'
import './styles/variables.css'
import './styles/animations.css'
import './styles/utilities.css'

// Page transition animation variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    x: -20,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
}

function App() {
  const location = useLocation()

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
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ============ PUBLIC ROUTES ============ */}
          <Route 
            path="/" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Home />
              </motion.div>
            } 
          />
          <Route 
            path="/features" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Features />
              </motion.div>
            } 
          />
          <Route 
            path="/architecture" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Architecture />
              </motion.div>
            } 
          />
          <Route 
            path="/demo" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Demo />
              </motion.div>
            } 
          />
          <Route 
            path="/pricing" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Pricing />
              </motion.div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About />
              </motion.div>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Contact />
              </motion.div>
            } 
          />
          <Route 
            path="/login" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Login />
              </motion.div>
            } 
          />

          {/* ============ DASHBOARD ROUTES (Protected) ============ */}
          <Route 
            path="/dashboard" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Analytics />
              </motion.div>
            } 
          />
          <Route 
            path="/user-sessions" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <UserSessions />
              </motion.div>
            } 
          />
          <Route 
            path="/behavior" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Behaviour />
              </motion.div>
            } 
          />
          <Route 
            path="/friction" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <FrictionEngine />
              </motion.div>
            } 
          />
          <Route 
            path="/ai" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AIGenerator />
              </motion.div>
            } 
          />
          <Route 
            path="/generated" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <GeneratedUI />
              </motion.div>
            } 
          />
          <Route 
            path="/history" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <History />
              </motion.div>
            } 
          />
          <Route 
            path="/demo-portal" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <DemoPortal />
              </motion.div>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Settings />
              </motion.div>
            } 
          />
          <Route 
            path="/docs" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HelpDocs />
              </motion.div>
            } 
          />
          
          {/* ✅ NEW: Profile Page Route */}
          <Route 
            path="/profile" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Profile />
              </motion.div>
            } 
          />

          {/* ============ 404 NOT FOUND ============ */}
          <Route 
            path="*" 
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NotFound />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App