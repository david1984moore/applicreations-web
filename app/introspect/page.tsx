'use client'

import { AnimatePresence } from 'framer-motion'
import { useIntakeStore } from '@/stores/intakeStore'
import { WelcomeScreen } from '@/components/intake/WelcomeScreen'
import { OnboardingScreen } from '@/components/intake/OnboardingScreen'
import { QuestionnaireFlow } from '@/components/questionnaire/QuestionnaireFlow'

export default function IntrospectPage() {
  const phase = useIntakeStore((s) => s.phase)

  return (
    <AnimatePresence mode="wait">
      {phase === 'welcome' && <WelcomeScreen key="welcome" />}
      {phase === 'onboarding' && <OnboardingScreen key="onboarding" />}
      {(phase === 'questionnaire' || phase === 'review') && (
        <QuestionnaireFlow key="questionnaire" />
      )}
    </AnimatePresence>
  )
}
