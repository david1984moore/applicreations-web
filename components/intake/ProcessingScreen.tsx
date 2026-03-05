'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROTATING_MESSAGES = [
  'Analyzing your project...',
  'Mapping out the right approach...',
  'Calculating timelines and scope...',
  'Personalizing your proposal...',
  'Almost ready...',
]

export function ProcessingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % ROTATING_MESSAGES.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: 'linear-gradient(135deg, oklch(0.12 0.04 250) 0%, oklch(0.18 0.06 260) 100%)',
      }}
    >
      {/* Animated logo mark */}
      <motion.div
        className="mb-8 h-16 w-12 text-white"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 48 64" className="h-full w-full">
          <path
            d="M24 4 L24 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      <motion.p
        className="mb-6 text-lg font-medium text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Building your custom project scope...
      </motion.p>

      {/* Indeterminate progress bar */}
      <div className="mb-8 h-1 w-64 overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full bg-white/60"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ width: '40%' }}
        />
      </div>

      {/* Rotating messages */}
      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            className="text-base text-white/70"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {ROTATING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
