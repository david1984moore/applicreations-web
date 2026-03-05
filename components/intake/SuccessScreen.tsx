'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const STEPS = [
  {
    num: 1,
    title: 'Review your proposal',
    desc: 'in your inbox.',
  },
  {
    num: 2,
    title: "We'll reach out within",
    desc: '24 hours to answer any questions.',
  },
  {
    num: 3,
    title: 'We kick off your build',
    desc: '— and you get a beautiful website.',
  },
]

interface SuccessScreenProps {
  email: string
}

export function SuccessScreen({ email }: SuccessScreenProps) {
  const [showNextSteps, setShowNextSteps] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowNextSteps(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center overflow-auto px-6 py-16"
      style={{
        background: 'linear-gradient(135deg, oklch(0.12 0.04 250) 0%, oklch(0.18 0.06 260) 100%)',
      }}
    >
      <div className="flex max-w-lg flex-col items-center text-center">
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6"
        >
          <Check
            className="h-16 w-16"
            style={{ color: 'oklch(0.72 0.18 160)' }}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.div>

        <motion.h1
          className="mb-4 text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          It&apos;s on its way.
        </motion.h1>

        <motion.p
          className="mb-2 text-base text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          Your custom proposal is headed to
        </motion.p>
        <motion.p
          className="mb-8 text-base font-medium text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          style={{
            textDecoration: 'underline',
            textDecorationColor: 'oklch(0.72 0.18 160)',
            textUnderlineOffset: 4,
          }}
        >
          {email || 'your email'}
        </motion.p>

        <motion.ul
          className="mb-12 space-y-2 text-left text-base text-white/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          {[
            'Check your inbox in the next few minutes',
            'Your proposal includes everything we just talked about',
            "We'll be in touch about next steps",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className="text-[oklch(0.72_0.18_160)]"
                style={{ fontSize: '0.6em' }}
              >
                ✦
              </span>
              {item}
            </li>
          ))}
        </motion.ul>

        {/* What's next */}
        {showNextSteps && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="mx-auto mb-8 h-px w-16"
              style={{ backgroundColor: 'oklch(0.72 0.18 160)' }}
            />
            <h2 className="mb-8 text-xl font-semibold text-white">
              What happens next?
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm"
                >
                  <div
                    className="mb-3 text-2xl font-bold"
                    style={{ color: 'oklch(0.72 0.18 160)' }}
                  >
                    {step.num}
                  </div>
                  <p className="text-sm font-medium text-white">{step.title}</p>
                  <p className="text-sm text-white/80">{step.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/60">
              Questions? Reach us at{' '}
              <a
                href="mailto:hello@applicreations.com"
                className="text-white/80 hover:underline"
              >
                hello@applicreations.com
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
