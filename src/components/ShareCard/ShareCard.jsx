import React, { useState } from 'react'

const ShareCard = ({theme, onYearSelect}) => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = () => {
        const y = parseInt(input)
        if(isNaN(y) || y < 1920 || y > 2024){
            setError('Please enter a year between 1920 and 2024')
            return
        }
        setError('')
        onYearSelect(y)
        setOpen(false)
        setInput('')

        // update url with year param
        const url = new URL(window.location.href)
        url.searchParams.set('year',y)
        window.history.pushState({},'',url)
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false),2000)
    }
  return (
    <>
      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="text-xs uppercase tracking-widest px-4 py-2 rounded-full font-medium"
        style={{
          background: theme.surface,
          border: `0.5px solid ${theme.accent}50`,
          color: theme.accent,
        }}
      >
        ✦ Find My Year
      </motion.button>

      {/* Modal */}
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
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />

            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="w-full max-w-sm rounded-2xl p-8 flex flex-col items-center gap-4"
                style={{
                  background: theme.bg,
                  border: `0.5px solid ${theme.accent}40`,
                  pointerEvents: 'all',
                  boxShadow: `0 0 60px ${theme.accent}20`,
                }}
              >
                {/* Title */}
                <p
                  className="text-xs uppercase tracking-widest opacity-50"
                  style={{ color: theme.text }}
                >
                  Travel to your year
                </p>
                <h2
                  className="text-2xl font-bold text-center"
                  style={{ color: theme.text }}
                >
                  What year were you born?
                </h2>

                {/* Input */}
                <input
                  type="number"
                  min={1920}
                  max={2024}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setError('')
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="e.g. 1995"
                  className="w-full text-center text-3xl font-bold bg-transparent outline-none border-b-2 pb-2"
                  style={{
                    color: theme.accent,
                    borderColor: `${theme.accent}50`,
                    caretColor: theme.accent,
                  }}
                />

                {/* Error */}
                {error && (
                  <p className="text-xs opacity-60" style={{ color: '#ff6b6b' }}>
                    {error}
                  </p>
                )}

                {/* Buttons */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-xl font-semibold text-sm"
                  style={{ background: theme.accent, color: theme.bg }}
                >
                  Take me there →
                </motion.button>

                <button
                  onClick={() => setOpen(false)}
                  className="text-xs opacity-30 hover:opacity-60 transition-opacity"
                  style={{ color: theme.text }}
                >
                  cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share button — always visible */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleShare}
        className="text-xs uppercase tracking-widest px-4 py-2 rounded-full font-medium"
        style={{
          background: theme.surface,
          border: `0.5px solid ${theme.accent}50`,
          color: theme.text,
          opacity: 0.7,
        }}
      >
        {copied ? '✓ Copied!' : '↗ Share'}
      </motion.button>
    </>
  )
}

export default ShareCard
