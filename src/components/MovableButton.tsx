import { useState, useRef, useEffect } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

const MovableButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastMoveTime = useRef<number>(0)

  // Super hard settings - almost impossible
  const DETECTION_RADIUS = 10 // Very small detection area
  const MOVE_DISTANCE = 280 // Moves very far
  const MOVEMENT_SPEED = 0.02 // Almost instant movement
  const PREDICTIVE_DISTANCE = 150 // Starts moving when cursor is still far
  const CONTINUOUS_MOVEMENT = true // Keeps moving even when cursor is far

  useEffect(() => {
    // Initialize button position randomly
    if (containerRef.current && buttonRef.current) {
      const container = containerRef.current
      const button = buttonRef.current
      const containerRect = container.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()
      
      const maxX = containerRect.width - buttonRect.width
      const maxY = containerRect.height - buttonRect.height
      
      setPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY
      })
    }
  }, [])

  // Continuous movement animation
  useEffect(() => {
    const animate = () => {
      if (!buttonRef.current || !containerRef.current) return

      const container = containerRef.current
      const button = buttonRef.current
      const containerRect = container.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()
      const maxX = containerRect.width - buttonRect.width
      const maxY = containerRect.height - buttonRect.height

      // Apply velocity with some damping
      setPosition(prev => {
        let newX = prev.x + velocity.vx
        let newY = prev.y + velocity.vy

        // Bounce off walls
        if (newX < 0 || newX > maxX) {
          setVelocity(v => ({ ...v, vx: -v.vx * 0.8 }))
          newX = Math.max(0, Math.min(maxX, newX))
        }
        if (newY < 0 || newY > maxY) {
          setVelocity(v => ({ ...v, vy: -v.vy * 0.8 }))
          newY = Math.max(0, Math.min(maxY, newY))
        }

        return { x: newX, y: newY }
      })

      // Dampen velocity
      setVelocity(v => ({
        vx: v.vx * 0.95,
        vy: v.vy * 0.95
      }))

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [velocity])

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          }))
          .filter(p => p.life > 0)
      )
      
      if (particles.length > 0) {
        requestAnimationFrame(animateParticles)
      }
    }
    
    if (particles.length > 0) {
      requestAnimationFrame(animateParticles)
    }
  }, [particles.length])

  const createParticles = (x: number, y: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * (3 + Math.random() * 4),
        vy: Math.sin(angle) * (3 + Math.random() * 4),
        life: 40
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || !containerRef.current) return

    const now = Date.now()
    // Throttle movement updates for better performance
    if (now - lastMoveTime.current < 5) return
    lastMoveTime.current = now

    const button = buttonRef.current
    const container = containerRef.current
    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Get mouse position relative to container
    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top

    // Get button center position
    const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2

    // Calculate distance from mouse to button center
    const distanceX = mouseX - buttonCenterX
    const distanceY = mouseY - buttonCenterY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Predictive movement - starts moving when cursor is approaching
    if (distance < PREDICTIVE_DISTANCE) {
      const angle = Math.atan2(distanceY, distanceX)
      
      // Add some randomness to make it unpredictable
      const randomOffset = (Math.random() - 0.5) * 0.3 // ±15% randomness
      const finalAngle = angle + randomOffset
      
      // Calculate movement with extra distance
      const moveDistance = MOVE_DISTANCE * (1 + Math.random() * 0.3) // 0-30% extra distance
      
      const maxX = containerRect.width - buttonRect.width
      const maxY = containerRect.height - buttonRect.height

      // Calculate new position
      let newX = position.x + Math.cos(finalAngle) * moveDistance
      let newY = position.y + Math.sin(finalAngle) * moveDistance

      // Keep within bounds with bounce effect
      if (newX < 0) {
        newX = 0
        setVelocity(v => ({ ...v, vx: Math.abs(v.vx) + 2 }))
      } else if (newX > maxX) {
        newX = maxX
        setVelocity(v => ({ ...v, vx: -Math.abs(v.vx) - 2 }))
      }
      
      if (newY < 0) {
        newY = 0
        setVelocity(v => ({ ...v, vy: Math.abs(v.vy) + 2 }))
      } else if (newY > maxY) {
        newY = maxY
        setVelocity(v => ({ ...v, vy: -Math.abs(v.vy) - 2 }))
      }

      // Clamp to bounds
      newX = Math.max(0, Math.min(maxX, newX))
      newY = Math.max(0, Math.min(maxY, newY))

      // Set position instantly (no transition when escaping)
      setPosition({ x: newX, y: newY })
      
      // Add velocity for continuous movement
      setVelocity({
        vx: Math.cos(finalAngle) * 5 + (Math.random() - 0.5) * 2,
        vy: Math.sin(finalAngle) * 5 + (Math.random() - 0.5) * 2
      })

      setIsHovered(true)
    } else if (distance < PREDICTIVE_DISTANCE * 1.5) {
      // Still add some movement even when cursor is moderately close
      const angle = Math.atan2(distanceY, distanceX)
      setVelocity({
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2
      })
    } else {
      setIsHovered(false)
    }
  }

  const handleButtonClick = () => {
    if (!buttonRef.current || !containerRef.current) return

    setScore(score + 1)
    setAttempts(attempts + 1)
    setShowSuccess(true)

    // Create particles at button position
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    createParticles(
      buttonRect.left - containerRect.left + buttonRect.width / 2,
      buttonRect.top - containerRect.top + buttonRect.height / 2
    )

    // Hide success message after 1.5 seconds
    setTimeout(() => setShowSuccess(false), 1500)

    // Move button to new random position instantly
    const container = containerRef.current
    const button = buttonRef.current
    const containerRect2 = container.getBoundingClientRect()
    const buttonRect2 = button.getBoundingClientRect()
    
    const maxX = containerRect2.width - buttonRect2.width
    const maxY = containerRect2.height - buttonRect2.height
    
    setPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY
    })
    
    // Reset velocity
    setVelocity({ vx: 0, vy: 0 })
  }

  const resetGame = () => {
    setScore(0)
    setAttempts(0)
    setShowSuccess(false)
    setParticles([])
    setVelocity({ vx: 0, vy: 0 })
    
    if (containerRef.current && buttonRef.current) {
      const container = containerRef.current
      const button = buttonRef.current
      const containerRect = container.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()
      
      const maxX = containerRect.width - buttonRect.width
      const maxY = containerRect.height - buttonRect.height
      
      setPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY
      })
    }
  }

  const successRate = attempts > 0 ? ((score / attempts) * 100).toFixed(1) : '0'

  return (
    <div className="w-full space-y-4">
      {/* Stats and Controls */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-2xl font-bold text-purple-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Attempts</p>
              <p className="text-2xl font-bold text-blue-600">{attempts}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{successRate}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-red-100 border-2 border-red-300 rounded-md">
              <span className="text-sm font-bold text-red-700">⚡ IMPOSSIBLE MODE ⚡</span>
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-96 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl overflow-hidden border-2 border-red-300 shadow-xl"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Instructions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-center px-4">
            <p className="text-red-700 text-lg md:text-xl font-bold mb-2">
              ⚠️ IMPOSSIBLE CHALLENGE ⚠️
            </p>
            <p className="text-red-600 text-sm md:text-base font-medium">
              The button moves at lightning speed - good luck catching it!
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce text-xl font-bold">
              🎉 LEGENDARY CATCH! +1 Point
            </div>
          </div>
        )}

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-30"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.life / 40,
              transform: `scale(${particle.life / 40})`
            }}
          />
        ))}

        {/* Movable Button - Super Fast */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isHovered 
              ? 'none' // No transition when escaping - instant movement
              : `transform 0.05s linear` // Very fast when not escaping
          }}
          className="absolute top-0 left-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-red-500/50 cursor-pointer z-10 whitespace-nowrap transform border-2 border-white/30 backdrop-blur-sm animate-pulse"
        >
          <span className="flex items-center gap-2">
            <span className="animate-spin">⚡</span>
            <span>Too Fast!</span>
            <span className="animate-ping">🚀</span>
          </span>
        </button>

        {/* Difficulty Indicator */}
        <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md z-10">
          <span className="text-xs font-bold text-white">
            ⚡ IMPOSSIBLE ⚡
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovableButton
