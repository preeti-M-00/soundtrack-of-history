import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCountryEvents } from '../../data/countryEvents'

const POSITIONS = [
  { side: 'left', top: '8%' },
  { side: 'left', top: '30%' },
  { side: 'left', top: '52%' },
  { side: 'left', top: '74%' },
  { side: 'right', top: '8%' },
  { side: 'right', top: '30%' },
  { side: 'right', top: '52%' },
  { side: 'right', top: '74%' },
]

const NewsCard = ({ text, tag, theme, position, index }) => {
  const isLeft = position.side === 'left'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isLeft ? -40 : 40 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="absolute w-48 rounded-xl p-3"
      style={{
        [position.side]: '24px',
        top: position.top,
        background: theme.surface,
        border: `0.5px solid ${theme.accent}35`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="text-xs font-bold tracking-widest uppercase mb-2 pb-2"
        style={{
          color: theme.accent,
          borderBottom: `0.5px solid ${theme.accent}25`,
        }}
      >
        {tag}
      </div>
      <p
        className="text-xs leading-snug opacity-85"
        style={{ color: theme.text }}
      >
        {text}
      </p>
    </motion.div>
  )
}

const NewsCards = ({ theme, country }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timer)
  }, [theme.name, country])

  // Get country-specific events, falling back to global theme events
  const events = getCountryEvents(country, theme.name, theme.events)

  return (
    <AnimatePresence>
      {visible &&
        POSITIONS.map((position, i) => (
          <NewsCard
            key={`${theme.name}-${country}-${i}`}
            text={events[i]}
            tag={theme.cardTag}
            theme={theme}
            position={position}
            index={i}
          />
        ))}
    </AnimatePresence>
  )
}

export default NewsCards