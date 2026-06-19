import React, { useState } from 'react'
import EraBackground from './components/EraBackground/EraBackground'
import Timeline from './components/Timeline/Timeline'
import StatsPanel from './components/StatsPanel/StatsPanel'
import NewsCards from './components/NewsCards/NewsCards'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import CountrySelector from './components/CountrySelector/CountrySelector'
import useEraTheme from './hooks/useEraTheme'
import { motion, AnimatePresence } from 'framer-motion'
import useCountryStats from './hooks/useCountryStats'
import BirthdayModal from './components/BirthdayModal/BirthdayModal'

const App = () => {
  const [year, setYear] = useState(1984)
  const [country, setCountry] = useState('WLD')
  const theme = useEraTheme(year)
  const stats = useCountryStats(year, country)

  return (
    <EraBackground theme={theme}>
      <div className="min-h-screen flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-6 pb-2">
          <motion.p
            animate={{ color: theme.accent }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest opacity-60 font-medium"
          >
            Soundtrack of History
          </motion.p>
          <div className="flex items-center gap-3">
            <BirthdayModal
              theme={theme}
              onYearSelect={setYear}
            />
            <CountrySelector
              country={country}
              onChange={setCountry}
              theme={theme}
            />
          </div>
        </div>

        {/* Main content */}
<div className="relative flex flex-1 items-center justify-center px-6">

  <NewsCards theme={theme} country={country} />

  {/* Centre content */}
  <div className="flex flex-col items-center justify-center">

    {/* Era name */}
    <AnimatePresence mode="wait">
      <motion.p
        key={theme.name}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="text-xs uppercase tracking-widest mb-2 font-medium"
        style={{ color: theme.accent }}
      >
        {theme.name}
      </motion.p>
    </AnimatePresence>

    {/* Year */}
    <AnimatePresence mode="wait">
      <motion.h1
        key={year}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="font-bold mb-2"
        style={{
          color: theme.text,
          fontSize: 'clamp(64px, 10vw, 100px)',
          lineHeight: 1,
          textShadow: `0 2px 40px ${theme.accent}40`,
        }}
      >
        {year}
      </motion.h1>
    </AnimatePresence>

    {/* Vibe text */}
    <AnimatePresence mode="wait">
      <motion.p
        key={theme.vibe}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xs text-center mb-8 max-w-xs opacity-50"
        style={{ color: theme.text }}
      >
        {theme.vibe}
      </motion.p>
    </AnimatePresence>

    {/* Vinyl music player */}
    <MusicPlayer theme={theme} />

    {/* Stats */}
    <div className="mt-8">
      <StatsPanel
        theme={theme}
        year={year}
        country={country}
        stats={stats}
      />
    </div>

  </div>

</div>

{/* Timeline at the bottom */}
<Timeline year={year} onChange={setYear} theme={theme} />

      </div>
    </EraBackground>
  )
}

export default App