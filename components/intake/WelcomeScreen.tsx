'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useIntakeStore } from '@/stores/intakeStore'
import { ANIMATION } from '@/lib/animations/constants'

export function WelcomeScreen() {
  const advanceFromWelcome = useIntakeStore((s) => s.advanceFromWelcome)

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, oklch(0.12 0.04 250) 0%, oklch(0.18 0.06 260) 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, oklch(0.6 0.1 250) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, oklch(0.5 0.08 260) 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Applicreations wordmark — top-left */}
      <Link
        href="/"
        className="absolute left-6 top-6 flex items-center gap-2 opacity-70 transition-opacity hover:opacity-90"
        aria-label="Applicreations home"
      >
        <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
        <span className="text-sm font-medium text-white">Applicreations</span>
      </Link>

      {/* Centered content */}
      <div className="relative flex flex-col items-center justify-center px-6 text-center">
        {/* Animated "I" logo mark */}
        <motion.svg
          viewBox="0 0 48 64"
          className="mb-6 h-16 w-12 text-white"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.2, ease: 'easeInOut' },
            opacity: { duration: 0.5 },
          }}
        >
          <motion.path
            d="M24 4 L24 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="56"
            initial={{ strokeDashoffset: 56 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </motion.svg>

        {/* INTROSPECT */}
        <motion.h1
          className="mb-4 text-lg font-medium tracking-[0.3em] text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: ANIMATION.duration.normal / 1000 }}
        >
          INTROSPECT
        </motion.h1>

        {/* Thin rule */}
        <motion.hr
          className="mb-4 h-px w-10 bg-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: ANIMATION.duration.normal / 1000 }}
        />

        {/* Tagline — materializes softly, left-to-right, like appearing out of thin air */}
        <motion.p
          className="mb-8 text-xl font-medium text-white/85 md:text-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 2.4,
              },
            },
          }}
        >
          {['Your ', 'website. ', 'Perfectly ', 'understood.'].map((word, i) => (
            <motion.span
              key={i}
              className="inline"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 5.5,
                    ease: [0.22, 0.61, 0.36, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Button — slowly fades in after tagline finishes */}
        <motion.button
          type="button"
          onClick={advanceFromWelcome}
          className="group inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white bg-transparent px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-white hover:text-[oklch(0.45_0.18_250)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 3.9,
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          Let&apos;s get started
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  )
}
