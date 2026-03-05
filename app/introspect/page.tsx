'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntakeStore } from '@/stores/intakeStore'
import { WelcomeScreen } from '@/components/intake/WelcomeScreen'
import { OnboardingScreen } from '@/components/intake/OnboardingScreen'
import { QuestionShell } from '@/components/intake/QuestionShell'
import { ReviewScreen } from '@/components/intake/ReviewScreen'
import { ProgressBar } from '@/components/intake/ProgressBar'

export default function IntrospectPage() {
  const router = useRouter()
  const { phase, isComplete, progress } = useIntakeStore()

  useEffect(() => {
    if (isComplete) {
      router.replace('/introspect/complete')
    }
  }, [isComplete, router])

  const isQuestionnaire = phase === 'questionnaire'

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.002_250)] font-sans">
      {isQuestionnaire && (
        <div className="sticky top-[60px] z-40 bg-[oklch(0.99_0.002_250)]">
          <ProgressBar progress={progress} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div key="welcome" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeScreen />
          </motion.div>
        )}
        {phase === 'onboarding' && (
          <motion.div key="onboarding" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OnboardingScreen />
          </motion.div>
        )}
        {phase === 'questionnaire' && (
          <motion.div key="questionnaire" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuestionShell />
          </motion.div>
        )}
        {phase === 'review' && (
          <motion.div key="review" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ReviewScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
