import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MusicPlayer = ({ theme }) => {
  const [playing, setPlaying] = useState(false)

  const song = theme.song
  const artist = theme.artist
  const youtubeId = theme.youtubeId

  // Stop playing when era changes
  useEffect(() => {
    setPlaying(false)
  }, [theme.name])

  return (
    <div className="flex flex-col items-center w-full max-w-sm">

      {/* Vinyl record */}
      <motion.div
        onClick={() => setPlaying((prev) => !prev)}
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { duration: 3, ease: 'linear', repeat: Infinity }
            : { duration: 0.5 }
        }
        className="relative w-36 h-36 rounded-full mb-4"
        style={{
          cursor: 'pointer',
          background: `radial-gradient(circle at 30% 30%, #2a2a2a, #000000)`,
          boxShadow: playing
            ? `0 0 30px ${theme.accent}60, 0 0 60px ${theme.accent}20`
            : `0 4px 20px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Vinyl grooves */}
        {[108, 90, 72, 54].map((size) => (
          <div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: `0.5px solid rgba(255,255,255,0.07)`,
            }}
          />
        ))}

        {/* Centre label */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.accent,
          }}
        >
          <span
            className="font-bold text-center leading-tight"
            style={{ color: theme.bg, fontSize: 8 }}
          >
            NO.1
          </span>
        </div>

        {/* Centre dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255,255,255,0.6)',
          }}
        />
      </motion.div>

      {/* Song info */}
      <motion.div
        key={song}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: theme.text }}
        >
          {song}
        </p>
        <p
          className="text-xs opacity-50"
          style={{ color: theme.text }}
        >
          {artist}
        </p>
        <p
          className="text-xs mt-2 uppercase tracking-widest opacity-30"
          style={{ color: theme.text, fontSize: 9 }}
        >
          {playing ? 'click vinyl to stop' : 'click vinyl to play'}
        </p>
      </motion.div>

      {/* Hidden YouTube iframe — audio only, no video visible */}
      {playing && youtubeId && (
        <div
          style={{
            position: 'fixed',
            bottom: -9999,
            left: -9999,
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            width="1"
            height="1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title={`${song} - ${artist}`}
          />
        </div>
      )}

    </div>
  )
}

export default MusicPlayer