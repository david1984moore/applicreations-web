'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Zap, FileText } from 'lucide-react'
import { useIntakeStore } from '@/stores/intakeStore'
import { ANIMATION } from '@/lib/animations/constants'

const cards = [
  {
    icon: MessageCircle,
    title: 'We\'ll ask you some fun questions about your project.',
    points: ['No wrong answers.'],
  },
  {
    icon: Zap,
    title: 'Takes about 10–15 minutes',
    points: ['No tech-speak.', 'No pressure.', 'Just honest answers.'],
  },
  {
    icon: FileText,
    title: 'You\'ll get a custom website proposal in your inbox.',
    points: ['Built for you.', 'Same day.'],
  },
]

export function OnboardingScreen() {
  const advanceFromOnboarding = useIntakeStore((s) => s.advanceFromOnboarding)

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-auto px-6 py-16"
      style={{
        background: 'linear-gradient(135deg, oklch(0.12 0.04 250) 0%, oklch(0.18 0.06 260) 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        {/* Header */}
        <motion.h2
          className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION.duration.normal / 1000 }}
        >
          Before we dive in...
        </motion.h2>
        <motion.p
          className="mb-12 text-center text-base text-white/70"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: ANIMATION.duration.normal / 1000 }}
        >
          Here&apos;s what&apos;s about to happen.
        </motion.p>

        {/* Cards */}
        <div className="mb-12 grid w-full gap-6 sm:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-white/15 bg-white/[0.08] p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.15,
                duration: ANIMATION.duration.normal / 1000,
              }}
            >
              <div
                className="mb-4 flex h-8 w-8 items-center justify-center"
                style={{ color: 'oklch(0.72 0.18 160)' }}
              >
                <card.icon className="h-8 w-8" aria-hidden />
              </div>
              <p className="mb-2 text-base font-medium text-white">{card.title}</p>
              <ul className="space-y-1 text-sm text-white/80">
                {card.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.button
          type="button"
          onClick={advanceFromOnboarding}
          className="group inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white bg-transparent px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-white hover:text-[oklch(0.45_0.18_250)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: ANIMATION.duration.normal / 1000 }}
        >
          I&apos;m ready — let&apos;s go
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  )
}
