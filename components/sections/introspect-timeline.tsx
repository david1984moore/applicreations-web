'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useScroll } from 'framer-motion'

const STEPS = [
  'You answer questions about your project',
  'Your answers become a complete build blueprint',
  'Your demo is built and delivered',
  'Like it? Scope is finalized and work begins.',
]

const DOT_YS = [36, 108, 180, 252]
const LINE_X = 6
const GLOW_X = 40
const GLOW_W = 80
const GLOW_H = 288

interface Segment {
  y1: number
  y2: number
}

interface GlowEntry {
  y: number
  startTime: number
  duration: number
  innerR: number
  outerR: number
}

export function IntrospectTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineCanvasRef = useRef<HTMLCanvasElement>(null)
  const glowCanvasRef = useRef<HTMLCanvasElement>(null)
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const dotRefs = useRef<(SVGCircleElement | null)[]>([])

  const cancelledRef = useRef(false)
  const segs = useRef<Segment[]>([
    { y1: DOT_YS[0], y2: DOT_YS[0] },
    { y1: DOT_YS[1], y2: DOT_YS[1] },
    { y1: DOT_YS[2], y2: DOT_YS[2] },
  ])
  const activeGlows = useRef<GlowEntry[]>([])
  const glowRafId = useRef<number | null>(null)

  // --- Canvas helpers ---

  function drawLine() {
    const ctx = lineCanvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, 12, 288)
    ctx.strokeStyle = 'oklch(68% 0.22 290)'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    for (let i = 0; i < 3; i++) {
      const s = segs.current[i]
      if (s.y2 > s.y1) {
        ctx.beginPath()
        ctx.moveTo(LINE_X, s.y1)
        ctx.lineTo(LINE_X, s.y2)
        ctx.stroke()
      }
    }
  }

  function drawGlows(gctx: CanvasRenderingContext2D, now: number) {
    gctx.clearRect(0, 0, GLOW_W, GLOW_H)
    activeGlows.current = activeGlows.current.filter(g => {
      const t = (now - g.startTime) / g.duration
      if (t > 1) return false

      const fadeIn = Math.min(t / 0.08, 1.0)
      const fadeOut = t < 0.08 ? 1.0 : 1 - Math.pow((t - 0.08) / 0.92, 1.2)
      const env = fadeIn * fadeOut

      // Outer bloom
      const og = gctx.createRadialGradient(GLOW_X, g.y, 0, GLOW_X, g.y, g.outerR)
      og.addColorStop(0,   `rgba(200,160,255,${env * 0.85})`)
      og.addColorStop(0.5, `rgba(160,110,255,${env * 0.5})`)
      og.addColorStop(1,   `rgba(120,70,220,0)`)
      gctx.beginPath()
      gctx.arc(GLOW_X, g.y, g.outerR, 0, Math.PI * 2)
      gctx.fillStyle = og
      gctx.fill()

      // Inner core — near white at peak
      const ig = gctx.createRadialGradient(GLOW_X, g.y, 0, GLOW_X, g.y, g.innerR)
      ig.addColorStop(0,   `rgba(255,252,255,${env * 1.0})`)
      ig.addColorStop(0.3, `rgba(230,200,255,${env * 1.0})`)
      ig.addColorStop(0.7, `rgba(180,130,255,${env * 0.8})`)
      ig.addColorStop(1,   `rgba(140,90,255,0)`)
      gctx.beginPath()
      gctx.arc(GLOW_X, g.y, g.innerR, 0, Math.PI * 2)
      gctx.fillStyle = ig
      gctx.fill()

      return true
    })
  }

  function glowLoop(now: number) {
    const gctx = glowCanvasRef.current?.getContext('2d')
    if (!gctx) return
    drawGlows(gctx, now)
    if (activeGlows.current.length > 0) {
      glowRafId.current = requestAnimationFrame(glowLoop)
    } else {
      glowRafId.current = null
    }
  }

  function triggerGlow(dotIndex: number, large: boolean) {
    const duration = large ? 1900 : 1200
    const innerR = large ? 16 : 10
    const outerR = large ? 34 : 22
    activeGlows.current.push({
      y: DOT_YS[dotIndex],
      startTime: performance.now(),
      duration,
      innerR,
      outerR,
    })
    if (!glowRafId.current) {
      glowRafId.current = requestAnimationFrame(glowLoop)
    }
  }

  // --- Animation primitives ---

  function pause(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
  }

  function springDot(i: number): Promise<void> {
    return new Promise(resolve => {
      const dot = dotRefs.current[i]
      const text = textRefs.current[i]
      const duration = 400
      const start = performance.now()

      triggerGlow(i, false)

      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1)
        const s = t === 1
          ? 1
          : 1 - Math.pow(2, -10 * t) * Math.cos((t * 10 - 0.75) * (2 * Math.PI) / 3)
        dot?.setAttribute('r', String(5 * Math.max(0, s)))
        if (t < 1) requestAnimationFrame(tick)
        else { dot?.setAttribute('r', '5'); resolve() }
      }
      requestAnimationFrame(tick)
      setTimeout(() => {
        if (text) {
          text.style.opacity = '1'
          text.style.transform = 'translateX(0)'
        }
      }, 80)
    })
  }

  function growSegment(segIndex: number, fromY: number, toY: number, duration: number): Promise<void> {
    return new Promise(resolve => {
      const start = performance.now()
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      function tick(now: number) {
        const raw = Math.min((now - start) / duration, 1)
        const s = segs.current[segIndex]
        s.y2 = fromY + (toY - fromY) * ease(raw)
        drawLine()
        if (raw < 1) requestAnimationFrame(tick)
        else {
          s.y2 = toY
          drawLine()
          resolve()
        }
      }
      requestAnimationFrame(tick)
    })
  }

  function animateVal(
    get: () => number,
    set: (v: number) => void,
    target: number,
    duration: number
  ): Promise<void> {
    return new Promise(resolve => {
      const start = performance.now()
      const startVal = get()
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      function tick(now: number) {
        const raw = Math.min((now - start) / duration, 1)
        const t = ease(raw)
        set(startVal + (target - startVal) * t)
        drawLine()
        if (raw < 1) requestAnimationFrame(tick)
        else resolve()
      }
      requestAnimationFrame(tick)
    })
  }

  function reset() {
    segs.current = [
      { y1: DOT_YS[0], y2: DOT_YS[0] },
      { y1: DOT_YS[1], y2: DOT_YS[1] },
      { y1: DOT_YS[2], y2: DOT_YS[2] },
    ]
    activeGlows.current = []
    if (glowRafId.current) {
      cancelAnimationFrame(glowRafId.current)
      glowRafId.current = null
    }
    const gctx = glowCanvasRef.current?.getContext('2d')
    if (gctx) gctx.clearRect(0, 0, GLOW_W, GLOW_H)
    DOT_YS.forEach((_, i) => {
      dotRefs.current[i]?.setAttribute('r', '0')
      const text = textRefs.current[i]
      if (text) {
        text.style.opacity = '0.25'
        text.style.transform = 'translateX(-6px)'
      }
    })
    drawLine()
  }

  // --- Sequence ---

  const run = useCallback(async () => {
    if (cancelledRef.current) return

    const ctx = lineCanvasRef.current?.getContext('2d')
    if (!ctx) return

    reset()
    await pause(300)

    // Forward animation (unchanged)
    await springDot(0)
    await pause(220)
    await growSegment(0, DOT_YS[0], DOT_YS[1], 540)
    await springDot(1)
    await pause(220)
    await growSegment(1, DOT_YS[1], DOT_YS[2], 540)
    await springDot(2)
    await pause(220)
    await growSegment(2, DOT_YS[2], DOT_YS[3], 540)
    await springDot(3)

    if (cancelledRef.current) return

    // Hold 2 seconds
    await pause(2000)

    if (cancelledRef.current) return

    // Reverse animation — lines retract segment by segment
    await animateVal(() => segs.current[0].y1, v => { segs.current[0].y1 = v }, DOT_YS[1], 500)
    triggerGlow(1, false)
    await pause(200)

    if (cancelledRef.current) return
    await animateVal(() => segs.current[1].y1, v => { segs.current[1].y1 = v }, DOT_YS[2], 500)
    triggerGlow(2, false)
    await pause(200)

    if (cancelledRef.current) return
    await animateVal(() => segs.current[2].y1, v => { segs.current[2].y1 = v }, DOT_YS[3], 500)
    triggerGlow(3, true)

    // Wait for final glow to finish, then loop
    await pause(2200)
    run()
  }, [])

  // --- Scroll trigger ---

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'start 40%'],
  })

  const hasStartedRef = useRef(false)

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      if (v > 0.1 && !hasStartedRef.current) {
        hasStartedRef.current = true
        run()
      }
    })
  }, [scrollYProgress, run])

  useEffect(() => {
    return () => {
      cancelledRef.current = true
    }
  }, [])

  return (
    <div ref={sectionRef} className="flex gap-7 items-start pl-10">
      {/* SVG + Canvas column — pl-10 gives room for glow (left: -34px) */}
      <div className="relative shrink-0 overflow-visible" style={{ width: 12, height: 288 }}>
        <canvas
          ref={glowCanvasRef}
          width={GLOW_W}
          height={GLOW_H}
          style={{ position: 'absolute', top: 0, left: -34, pointerEvents: 'none' }}
        />
        <canvas
          ref={lineCanvasRef}
          width={12}
          height={288}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <svg
          width={12}
          height={288}
          viewBox="0 0 12 288"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {DOT_YS.map((cy, i) => (
            <circle
              key={i}
              ref={el => { dotRefs.current[i] = el }}
              cx={6}
              cy={cy}
              r={0}
              fill="oklch(92% 0.14 290)"
            />
          ))}
        </svg>
      </div>

      {/* Steps */}
      <div className="flex flex-col flex-1">
        {STEPS.map((text, i) => (
          <div key={i} className="flex items-center" style={{ height: 72 }}>
            <p
              ref={el => { textRefs.current[i] = el }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.55,
                color: i === STEPS.length - 1 ? 'oklch(93% 0.04 290)' : 'oklch(85% 0.04 250)',
                fontWeight: i === STEPS.length - 1 ? 500 : 400,
                opacity: 0.25,
                transform: 'translateX(-6px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                margin: 0,
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
