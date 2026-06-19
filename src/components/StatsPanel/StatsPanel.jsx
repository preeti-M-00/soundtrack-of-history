import React from 'react'
import { motion } from 'framer-motion'

const StatChip = ({ label, value, accent, surface, loading }) => {
  return (
    <motion.div
      layout
      className="flex flex-col items-center px-4 py-2 rounded-2xl min-w-0"
      style={{
        background: surface,
        border: `0.5px solid ${accent}50`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <span className="text-xs uppercase tracking-widest mb-1 opacity-40 whitespace-nowrap">
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: loading ? 0.3 : 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-base font-semibold whitespace-nowrap"
        style={{ color: accent }}
      >
        {loading ? '...' : value}
      </motion.span>
    </motion.div>
  )
}

const StatsPanel = ({ theme, stats }) => {
  // Use real API data if available, fall back to hardcoded theme data
  const pop = stats?.pop || theme.pop
  const life = stats?.life || theme.life
  const loading = stats?.loading || false

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <StatChip
        label="Population"
        value={pop}
        accent={theme.accent}
        surface={theme.surface}
        loading={loading}
      />
      <StatChip
        label="Life Exp."
        value={life}
        accent={theme.accent}
        surface={theme.surface}
        loading={loading}
      />
      <StatChip
        label="Era"
        value={theme.decade}
        accent={theme.accent}
        surface={theme.surface}
        loading={false}
      />
    </div>
  )
}

export default StatsPanel