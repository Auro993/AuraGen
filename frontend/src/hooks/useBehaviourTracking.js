import { useState, useEffect, useRef, useCallback } from 'react'

const useBehaviourTracking = (sessionId) => {
  const [behaviour, setBehaviour] = useState({
    mouseDistance: 0,
    clicks: 0,
    wrongClicks: 0,
    idleTime: 0,
    scrollDepth: 0,
    formErrors: 0,
    sessionId: sessionId,
    duration: 0
  })
  
  const lastPosition = useRef({ x: 0, y: 0 })
  const idleTimer = useRef(null)
  const startTime = useRef(Date.now())
  const isIdle = useRef(false)
  
  // Track mouse movement
  const handleMouseMove = useCallback((e) => {
    const dx = e.clientX - lastPosition.current.x
    const dy = e.clientY - lastPosition.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    setBehaviour(prev => ({
      ...prev,
      mouseDistance: prev.mouseDistance + distance
    }))
    
    lastPosition.current = { x: e.clientX, y: e.clientY }
    
    // Reset idle timer
    if (isIdle.current) {
      isIdle.current = false
    }
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      isIdle.current = true
    }, 5000)
  }, [])
  
  // Track clicks
  const handleClick = useCallback((e) => {
    const target = e.target
    const isWrongClick = 
      target.tagName === 'BUTTON' && 
      !target.closest('form') &&
      !target.closest('button[type="submit"]')
    
    setBehaviour(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
      wrongClicks: prev.wrongClicks + (isWrongClick ? 1 : 0)
    }))
  }, [])
  
  // Track scroll
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const maxScroll = documentHeight - windowHeight
    const depth = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0
    
    setBehaviour(prev => ({
      ...prev,
      scrollDepth: Math.max(prev.scrollDepth, depth)
    }))
  }, [])
  
  // Track idle time
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (isIdle.current) {
        setBehaviour(prev => ({
          ...prev,
          idleTime: prev.idleTime + 1
        }))
      }
    }, 1000)
    
    return () => clearInterval(idleInterval)
  }, [])
  
  // Track session duration
  useEffect(() => {
    const durationInterval = setInterval(() => {
      setBehaviour(prev => ({
        ...prev,
        duration: Math.round((Date.now() - startTime.current) / 1000)
      }))
    }, 5000)
    
    return () => clearInterval(durationInterval)
  }, [])
  
  // Attach event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(idleTimer.current)
    }
  }, [handleMouseMove, handleClick, handleScroll])
  
  // Track form errors
  const trackFormError = useCallback(() => {
    setBehaviour(prev => ({
      ...prev,
      formErrors: prev.formErrors + 1
    }))
  }, [])
  
  // Reset behaviour
  const resetBehaviour = useCallback(() => {
    setBehaviour({
      mouseDistance: 0,
      clicks: 0,
      wrongClicks: 0,
      idleTime: 0,
      scrollDepth: 0,
      formErrors: 0,
      sessionId: sessionId,
      duration: 0
    })
    startTime.current = Date.now()
  }, [sessionId])
  
  return {
    ...behaviour,
    trackFormError,
    resetBehaviour
  }
}

export default useBehaviourTracking