import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getMoonPhase,
  getZodiac,
  getDayOfWeek,
  getSeason,
  estimatePopulation,
  getEraSong,
} from '../../utils/birthdayUtils'

const BirthdayModal = ({ theme, onYearSelect }) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [headline, setHeadline] = useState(null)

  const fetchHeadline = async (dateObj) => {
    try {
      const month = dateObj.getMonth() + 1
      const day = dateObj.getDate()
      const res = await fetch(
        `https://history.muffinlabs.com/date/${month}/${day}`
      )
      const data = await res.json()
      const events = data?.data?.Events || []
      const year = dateObj.getFullYear()

      // Find event closest to birth year
      const sorted = events
        .filter((e) => Math.abs(parseInt(e.year) - year) < 20)
        .sort((a, b) => Math.abs(parseInt(a.year) - year) - Math.abs(parseInt(b.year) - year))

      if (sorted.length > 0) {
        setHeadline(`${sorted[0].year}: ${sorted[0].text}`)
      } else if (events.length > 0) {
        const random = events[Math.floor(Math.random() * Math.min(events.length, 5))]
        setHeadline(`${random.year}: ${random.text}`)
      }
    } catch (err) {
      console.error("Headline fetch error:", err)
      setHeadline(null)
    }
  }

  const handleSubmit = async () => {
    if (!date) return
    setLoading(true)

    const dateObj = new Date(date)
    const year = dateObj.getFullYear()

    if (year < 1920 || year > 2024) {
      setLoading(false)
      return
    }

    const moon = getMoonPhase(dateObj)
    const zodiac = getZodiac(dateObj)
    const dayInfo = getDayOfWeek(dateObj)
    const season = getSeason(dateObj)
    const pop = estimatePopulation(year)
    const song = getEraSong(year)

    setResult({ moon, zodiac, dayInfo, season, pop, song, dateObj, year })

    // Snap timeline to birth year
    onYearSelect(year)

    // Fetch Wikipedia headline
    await fetchHeadline(dateObj)

    setLoading(false)
  }

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => { setOpen(true); setResult(null); setHeadline(null) }}
        className="text-xs uppercase tracking-widest px-4 py-2 rounded-full font-medium"
        style={{
          background: theme.surface,
          border: `0.5px solid ${theme.accent}50`,
          color: theme.accent,
        }}
      >
        ✦ My Birthday
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="w-full max-w-md rounded-2xl overflow-hidden"
                style={{
                  background: theme.bg,
                  border: `0.5px solid ${theme.accent}40`,
                  boxShadow: `0 0 80px ${theme.accent}25`,
                  pointerEvents: 'all',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  fontFamily: " 'Inter', sans-serif",
                }}
              >
                {/* Header */}
                <div
                  className="px-8 pt-8 pb-4 text-center"
                  style={{ borderBottom: `0.5px solid ${theme.accent}20` }}
                >
                  <p
                    className="text-xs uppercase tracking-widest opacity-40 mb-2"
                    style={{ color: theme.text }}
                  >
                    The universe on your birthday
                  </p>
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: theme.text }}
                  >
                    When were you born?
                  </h2>
                </div>

                {/* Date input */}
                {!result && (
                  <div className="px-8 py-6 flex flex-col items-center gap-4">
                    <input
                      type="date"
                      value={date}
                      min="1920-01-01"
                      max="2024-12-31"
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-center py-3 px-4 rounded-xl text-sm outline-none"
                      style={{
                        background: theme.surface,
                        border: `0.5px solid ${theme.accent}40`,
                        color: theme.text,
                        colorScheme: 'dark',
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      disabled={!date || loading}
                      className="w-full py-3 rounded-xl font-semibold text-sm"
                      style={{
                        background: theme.accent,
                        color: theme.bg,
                        opacity: !date || loading ? 0.5 : 1,
                      }}
                    >
                      {loading ? 'Reading the stars...' : 'Reveal my birthday universe →'}
                    </motion.button>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-xs opacity-30 hover:opacity-60 transition-opacity"
                      style={{ color: theme.text }}
                    >
                      cancel
                    </button>
                  </div>
                )}

                {/* Results */}
                {result && (
                  <div className="px-8 py-6 flex flex-col gap-4">

                    {/* Date header */}
                    <div className="text-center mb-2">
                      <p
                        className="text-lg font-bold"
                        style={{ color: theme.accent }}
                      >
                        {formatDate(result.dateObj)}
                      </p>
                    </div>

                    {/* Moon phase */}
                    <div
                      className="rounded-xl p-4 flex items-center gap-4"
                      style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                    >
                      <span className="text-3xl">{result.moon.emoji}</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>Moon Phase</p>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{result.moon.name}</p>
                        <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.text }}>{result.moon.description}</p>
                      </div>
                    </div>

                    {/* Zodiac */}
                    <div
                      className="rounded-xl p-4 flex items-center gap-4"
                      style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                    >
                      <span className="text-3xl">{result.zodiac.emoji}</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>Constellation</p>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{result.zodiac.sign} — {result.zodiac.constellation}</p>
                        <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.text }}>{result.zodiac.element} sign · {result.zodiac.dates}</p>
                      </div>
                    </div>

                    {/* Day of week */}
                    <div
                      className="rounded-xl p-4 flex items-center gap-4"
                      style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                    >
                      <span className="text-3xl">📅</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>Day of Birth</p>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{result.dayInfo.day}</p>
                        <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.text }}>{result.dayInfo.fact}</p>
                      </div>
                    </div>

                    {/* Season */}
                    <div
                      className="rounded-xl p-4 flex items-center gap-4"
                      style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                    >
                      <span className="text-3xl">{result.season.emoji}</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>Season</p>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{result.season.season}</p>
                        <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.text }}>{result.season.description}</p>
                      </div>
                    </div>

                    {/* World population */}
                    <div
                      className="rounded-xl p-4 flex items-center gap-4"
                      style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                    >
                      <span className="text-3xl">🌍</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>World Population</p>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{result.pop} people on Earth</p>
                        <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.text }}>when you took your first breath</p>
                      </div>
                    </div>

                    {/* Era song */}
                    <div
                      className="rounded-xl p-4 flex items-center gap-4"
                      style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                    >
                      <span className="text-3xl">🎵</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>Song of the Era</p>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{result.song.song}</p>
                        <p className="text-xs opacity-50 mt-0.5" style={{ color: theme.text }}>{result.song.artist}</p>
                      </div>
                    </div>

                    {/* Headline */}
                    {headline && (
                      <div
                        className="rounded-xl p-4 flex items-start gap-4"
                        style={{ background: theme.surface, border: `0.5px solid ${theme.accent}25` }}
                      >
                        <span className="text-3xl">📰</span>
                        <div>
                          <p className="text-xs uppercase tracking-widest opacity-40 mb-0.5" style={{ color: theme.text }}>On this day in history</p>
                          <p className="text-sm leading-relaxed" style={{ color: theme.text }}>{headline}</p>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 mt-2">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setResult(null); setHeadline(null) }}
                        className="flex-1 py-2 rounded-xl text-xs font-medium"
                        style={{
                          background: theme.surface,
                          border: `0.5px solid ${theme.accent}30`,
                          color: theme.text,
                        }}
                      >
                        ← Try another date
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setOpen(false)}
                        className="flex-1 py-2 rounded-xl text-xs font-medium"
                        style={{ background: theme.accent, color: theme.bg }}
                      >
                        Explore this era →
                      </motion.button>
                    </div>

                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default BirthdayModal