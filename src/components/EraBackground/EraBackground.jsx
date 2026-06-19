import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EraBackground = ({ theme, children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset to first image when era changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [theme.name])

  // Cycle through images every 5 seconds
  useEffect(() => {
    if (theme.images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === theme.images.length - 1 ? 0 : prev + 1
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [theme.name, theme.images.length])

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: theme.font }}
    >
      {/* Slideshow background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${theme.name}-${currentImageIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${theme.images[currentImageIndex]})` }}
        />
      </AnimatePresence>

      {/* Dark tint overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme.tint }}
      />

      {/* Accent glow at top */}
      <div
        className="absolute top-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${theme.accent}20 0%, transparent 70%)`
        }}
      />

      {/* Accent bar at very top */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 z-50"
        animate={{ backgroundColor: theme.accent }}
        transition={{ duration: 0.5 }}
      />

      {/* Image indicator dots */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {theme.images.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentImageIndex ? 20 : 6,
              opacity: i === currentImageIndex ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrentImageIndex(i)}
            className="h-1.5 rounded-full cursor-pointer"
            style={{ backgroundColor: theme.accent }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default EraBackground