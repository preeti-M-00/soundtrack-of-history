import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COUNTRIES = [
  { code: "WLD", name: "Global", flag: "🌍" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  // { code: "FR", name: "France", flag: "🇫🇷" },
  // { code: "DE", name: "Germany", flag: "🇩🇪" },
  // { code: "JP", name: "Japan", flag: "🇯🇵" },
  // { code: "CN", name: "China", flag: "🇨🇳" },
  // { code: "BR", name: "Brazil", flag: "🇧🇷" },
  // { code: "RU", name: "Russia", flag: "🇷🇺" },
  // { code: "AU", name: "Australia", flag: "🇦🇺" },
  // { code: "CA", name: "Canada", flag: "🇨🇦" },
  // { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  // { code: "MX", name: "Mexico", flag: "🇲🇽" },
  // { code: "KR", name: "South Korea", flag: "🇰🇷" },
  // { code: "IT", name: "Italy", flag: "🇮🇹" },
  // { code: "ES", name: "Spain", flag: "🇪🇸" },
  // { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  // { code: "AR", name: "Argentina", flag: "🇦🇷" },
  // { code: "EG", name: "Egypt", flag: "🇪🇬" },
]

const CountrySelector = ({ country, onChange, theme }) => {
  const [open, setOpen] = useState(false)

  const selected = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0]

  return (
    <div className="relative">

      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer"
        style={{
          background: theme.surface,
          border: `0.5px solid ${theme.accent}50`,
          color: theme.text,
        }}
      >
        <span>{selected.flag}</span>
        <span className="opacity-80">{selected.name}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="opacity-40 text-xs"
        >
          ▾
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-52 rounded-2xl overflow-hidden z-50 shadow-2xl"
            style={{
              background: theme.bg,
              border: `0.5px solid ${theme.accent}30`,
            }}
          >
            <div className="max-h-72 overflow-y-auto">
              {COUNTRIES.map((c) => {
                const isSelected = c.code === country
                return (
                  <motion.div
                    key={c.code}
                    whileHover={{ backgroundColor: `${theme.accent}15` }}
                    onClick={() => {
                      onChange(c.code)
                      setOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer text-sm"
                    style={{
                      color: isSelected ? theme.accent : theme.text,
                      backgroundColor: isSelected ? `${theme.accent}10` : "transparent",
                    }}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    {isSelected && (
                      <span className="ml-auto text-xs opacity-60">✓</span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default CountrySelector