'use client'

import { useRouter } from 'next/navigation'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'

export function ProgressBar({ progress }: { progress: number }) {
  const router = useRouter()
  const reset = useQuestionnaireStore((s) => s.reset)

  const handleStartOver = () => {
    reset()
    router.push('/introspect')
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      <div
        className="h-1 flex-1 w-full min-w-0 bg-[oklch(25%_0_0)]"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[oklch(57%_0.15_250)] transition-all duration-[400ms] ease-in-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <button
        type="button"
        onClick={handleStartOver}
        className="text-sm text-[oklch(50%_0_0)] hover:text-[oklch(70%_0_0)] transition-colors self-end md:self-auto md:shrink-0"
      >
        Start over
      </button>
    </div>
  )
}
