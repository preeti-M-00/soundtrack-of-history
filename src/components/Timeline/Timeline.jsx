import React from 'react'
import { motion } from 'framer-motion'

const DECADES = [1920,1940,1960,1980,2000,2024]
const Timeline = ({year, onChange, theme}) => {
    const percentage =((year-1920) / (2024-1920)) * 100

  return (
    <div className='w-full px-8 pb-8 pt-4'>
        <div className='relative w-full'>
            <input
            type="range"
            min={1920}
            max={2024}
            step={1}
            value={year}
            onChange={(e) => onChange(Number(e.target.value))}
            className='w-full h-1 rounded-full appearance-none cursor-pointer outline-none'
            style={{background: `linear-gradient(to right, ${theme.accent} ${percentage}%, rgba(255,255,255,0.15) ${percentage}%)`,
            accentColor: theme.accent}}/>
        </div>

        <div className='flex justify-between mt-3 px-1'>
            {DECADES.map((decade) => {
                const isActive = year >= decade && year < decade + 20
                return (
                    <motion.span key={decade} animate={{color: isActive ? theme.accent : theme.text, opacity: isActive ? 1 : 0.3}} transition={{duration: 0.4}} className='text-xs font-medium cursor-pointer' onClick={() => onChange(decade)}>
                        {decade}
                    </motion.span>
                )
            })}

        </div>
      
    </div>
  )
}

export default Timeline
