'use client'

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="h-1 w-full bg-[oklch(0.90_0.005_250)]"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}
