"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const QUESTION_GROUPS_SET_A = [
  {
    type: "select",
    question: "What are we building?",
    options: ["A website", "A web app", "An online store", "Not sure yet"],
    selectedIndex: 2,
  },
  {
    type: "text",
    question: "What does your business do?",
    typedValue: "We make candles — mostly soy, some beeswax. Sell online and at markets.",
  },
  {
    type: "select",
    question: "Do you have a logo or brand colors already?",
    helperText:
      "Perfectly fine if you don't, we can still work with you. If you decide you want to create a logo, we provide logo services for an additional fee.",
    options: ["Yes, all ready to go", "Logo only", "Starting from scratch", "Not sure"],
    selectedIndex: 0,
  },
  {
    type: "text",
    question: "Any websites you admire?",
    typedValue: "aesop.com, brightland.co",
  },
  {
    type: "select",
    question: "When do you need this done?",
    options: ["ASAP", "Within a month", "2–3 months", "No hard deadline"],
    selectedIndex: 1,
  },
  {
    type: "text",
    question: "What's the name of your business?",
    typedValue: "Wax & Wander",
  },
  {
    type: "select",
    question: "How would you describe your style?",
    options: ["Clean and minimal", "Bold and expressive", "Warm and organic", "Not sure yet"],
    selectedIndex: 2,
  },
  {
    type: "text",
    question: "What's the main thing you want people to do on your site?",
    typedValue: "Buy something, or at least know we're legit before they reach out.",
  },
];

const QUESTION_GROUPS_SET_B = [
  {
    type: "select",
    question: "What are we building?",
    options: ["A website", "A web app", "An online store", "Not sure yet"],
    selectedIndex: 0,
  },
  {
    type: "text",
    question: "What's the name of your business?",
    typedValue: "I just go by my name — Renee Calloway.",
  },
  {
    type: "select",
    question: "How would you describe your style?",
    options: ["Clean and minimal", "Bold and expressive", "Warm and organic", "Not sure yet"],
    selectedIndex: 0,
  },
  {
    type: "text",
    question: "What do you do?",
    typedValue: "Wedding and portrait photography. Some commercial on the side.",
  },
  {
    type: "select",
    question: "Do you have content ready — photos, copy, that kind of thing?",
    options: ["Yes, ready to go", "Some of it", "Not yet", "Need help with that"],
    selectedIndex: 1,
  },
  {
    type: "text",
    question: "What's the main thing you want people to do on your site?",
    typedValue: "Look at my work and reach out to book a session.",
  },
  {
    type: "select",
    question: "Have you worked with a developer before?",
    options: ["Yes", "No", "Used a template/DIY tool"],
    selectedIndex: 2,
  },
  {
    type: "text",
    question: "Any websites you admire?",
    typedValue: "josevilla.com, hellomayuko.com",
  },
];

const QUESTION_GROUPS_SET_C = [
  {
    type: "select",
    question: "What are we building?",
    options: ["A website", "A web app", "An online store", "Not sure yet"],
    selectedIndex: 3,
  },
  {
    type: "text",
    question: "What does your business do?",
    typedValue: "Honestly still figuring that out. Something in wellness, I think.",
  },
  {
    type: "select",
    question: "Do you have a logo or brand colors already?",
    options: ["Yes, all ready to go", "Logo only", "Starting from scratch", "Not sure"],
    selectedIndex: 2,
  },
  {
    type: "text",
    question: "What's the name of your business?",
    typedValue: "I don't have one yet.",
  },
  {
    type: "select",
    question: "When do you need this done?",
    options: ["ASAP", "Within a month", "2–3 months", "No hard deadline"],
    selectedIndex: 3,
  },
  {
    type: "text",
    question: "What's the main thing you want people to do on your site?",
    typedValue: "Not sure yet. Maybe just learn about what I do?",
  },
  {
    type: "select",
    question: "How would you describe your style?",
    options: ["Clean and minimal", "Bold and expressive", "Warm and organic", "Not sure yet"],
    selectedIndex: 3,
  },
  {
    type: "text",
    question: "Any websites you admire?",
    typedValue: "I'll know it when I see it, I guess.",
  },
];

const QUESTION_GROUPS = [
  ...QUESTION_GROUPS_SET_A,
  ...QUESTION_GROUPS_SET_B,
  ...QUESTION_GROUPS_SET_C,
];

// Timing (select questions — cursor moves and selects)
const FADE_IN_MS = 650;
const HOLD_MS = 900;
const CLICK_HOLD_MS = 400;
const SELECT_HOLD_MS = 1500;

// Timing (text questions — cursor appears, clicks, fades out, then types; faster)
const FADE_IN_MS_TEXT = 380;
const HOLD_MS_TEXT = 400;
const CLICK_HOLD_MS_TEXT = 200;
const RETREAT_MS = 200;
const CURSOR_FADEOUT_DURATION_S = 0.2;

const TYPE_SPEED_MS = 55;
const TYPED_HOLD_MS = 1200;
const FADE_OUT_MS = 550;
const BETWEEN_MS = 280;

const PURPLE = "rgba(109,95,255,1)";
const PURPLE_BORDER = "rgba(109,95,255,0.7)";
const PURPLE_BG = "rgba(109,95,255,0.12)";
const PURPLE_GLOW = "0 0 0 3px rgba(109,95,255,0.12), 0 4px 20px rgba(109,95,255,0.15)";

type Phase = "in" | "hold" | "retreat" | "active" | "done" | "out";

function useCycler() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");
  const [typedChars, setTypedChars] = useState(0);
  const [clicking, setClicking] = useState(false);

  const group = QUESTION_GROUPS[groupIndex];
  const isText = group.type === "text";

  // Main phase state machine
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "in") {
      t = setTimeout(
        () => setPhase("hold"),
        isText ? FADE_IN_MS_TEXT : FADE_IN_MS
      );
    } else if (phase === "hold") {
      const holdMs = isText ? HOLD_MS_TEXT : HOLD_MS;
      const clickHoldMs = isText ? CLICK_HOLD_MS_TEXT : CLICK_HOLD_MS;
      t = setTimeout(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 120);
        setTimeout(
          () => setPhase(isText ? "retreat" : "active"),
          clickHoldMs
        );
      }, holdMs);
    } else if (phase === "retreat") {
      t = setTimeout(() => setPhase("active"), RETREAT_MS);
    } else if (phase === "active") {
      if (!isText) {
        // select type: hold then done
        t = setTimeout(() => setPhase("done"), SELECT_HOLD_MS);
      }
      // text type: typing effect drives transition to done
    } else if (phase === "done") {
      t = setTimeout(() => setPhase("out"), isText ? TYPED_HOLD_MS : 0);
    } else if (phase === "out") {
      t = setTimeout(() => {
        setGroupIndex((i) => (i + 1) % QUESTION_GROUPS.length);
        setTypedChars(0);
        setPhase("in");
      }, FADE_OUT_MS + BETWEEN_MS);
    }

    return () => clearTimeout(t);
  }, [phase, isText]);

  // Typing effect — only runs when active + text group
  useEffect(() => {
    if (phase !== "active" || !isText) return;
    const target = (group as { typedValue: string }).typedValue;
    if (typedChars >= target.length) {
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setTypedChars((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [phase, typedChars, isText, group]);

  return { group, groupIndex, phase, typedChars, clicking };
}

const RADIO_X_OFFSET = 20;

export function IntrospectFieldCycler() {
  const { group, groupIndex, phase, typedChars, clicking } = useCycler();

  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clickStyles = useRef<("radio" | "center")[]>(
    QUESTION_GROUPS.map(() => (Math.random() < 0.5 ? "radio" : "center"))
  );

  const [cursorPos, setCursorPos] = useState({ x: 40, y: 80 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorOpacity, setCursorOpacity] = useState(1);
  const [cursorShape, setCursorShape] = useState<"arrow" | "ibeam">("arrow");
  const [cursorTransitionMode, setCursorTransitionMode] = useState<
    "instant" | "spring" | "fadeOut"
  >("instant");
  const [isMobile, setIsMobile] = useState(false);

  const isVisible =
    phase === "in" ||
    phase === "hold" ||
    phase === "retreat" ||
    phase === "active" ||
    phase === "done";
  const isActive = phase === "active" || phase === "done";

  // Hide cursor on mobile (< 640px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const cb = () => setIsMobile(mq.matches);
    cb();
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  // Cursor positioning
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (phase === "hold") {
      const target =
        group.type === "select"
          ? optionRefs.current[(group as { selectedIndex: number }).selectedIndex]
          : inputRef.current;

      if (!target) return;

      const tRect = target.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const relLeft = tRect.left - cRect.left;

      let targetX: number;
      if (group.type === "text") {
        targetX = relLeft + 14;
      } else {
        const clickStyle = clickStyles.current[groupIndex];
        targetX =
          clickStyle === "radio"
            ? relLeft + RADIO_X_OFFSET
            : relLeft + tRect.width / 2;
      }

      setCursorTransitionMode("spring");
      setCursorOpacity(1);
      setCursorPos({
        x: targetX,
        y: tRect.top - cRect.top + tRect.height * 0.45,
      });
      setCursorVisible(true);
      setCursorShape(group.type === "text" ? "ibeam" : "arrow");
    }

    if (phase === "retreat") {
      setCursorTransitionMode("fadeOut");
      setCursorOpacity(0);
    }

    if (phase === "out") {
      setCursorVisible(false);
      setCursorOpacity(1);
      setCursorShape("arrow");
    }

    if (phase === "in") {
      setCursorTransitionMode("instant");
      setCursorPos({ x: 40, y: 80 });
      setCursorOpacity(1);
      setCursorShape("arrow");
      const t = setTimeout(() => setCursorTransitionMode("spring"), 50);
      return () => clearTimeout(t);
    }
  }, [phase, group, groupIndex]);

  const isSelect = group.type === "select";
  const isText = group.type === "text";
  const typedValue = isText ? (group as { typedValue: string }).typedValue : "";
  const displayText = typedValue.slice(0, typedChars);
  const showCaret = isText && (phase === "active" || phase === "done");

  return (
    <div
      style={{
        borderRadius: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 0 0 1px rgba(109,95,255,0.08), 0 8px 40px rgba(109,95,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        overflow: "hidden",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        maxWidth: 520,
        height: 380,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* macOS header bar */}
      <div
        style={{
          height: 32,
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        >
          introspect
        </span>
      </div>

      {/* Content area */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          padding: "1.4rem 1.4rem 1.6rem",
          position: "relative",
          overflow: "hidden",
          transition: `opacity ${isVisible ? (isText ? FADE_IN_MS_TEXT : FADE_IN_MS) : FADE_OUT_MS}ms ease`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Question label */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "0.85rem",
            fontWeight: 500,
          }}
        >
          {group.question}
        </div>

        {(group as { helperText?: string }).helperText && (
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
              marginBottom: "0.85rem",
            }}
          >
            {(group as { helperText?: string }).helperText}
          </div>
        )}

        {/* SELECT interaction */}
        {isSelect && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {(group as { options: string[] }).options.map((option: string, i: number) => {
              const sel = isActive && i === (group as { selectedIndex: number }).selectedIndex;
              const faded = isActive && i !== (group as { selectedIndex: number }).selectedIndex;
              return (
                <div
                  key={`${groupIndex}-${i}`}
                  ref={(el) => { optionRefs.current[i] = el }}
                  style={{
                    padding: "0.55rem 0.85rem",
                    borderRadius: 10,
                    border: `1.5px solid ${sel ? PURPLE_BORDER : "rgba(255,255,255,0.08)"}`,
                    background: sel ? PURPLE_BG : "rgba(255,255,255,0.02)",
                    color: sel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
                    fontSize: 13,
                    opacity: faded ? 0.2 : 1,
                    transition: "all 0.35s ease",
                    boxShadow: sel ? PURPLE_GLOW : "none",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  {/* Radio dot */}
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      border: `1.5px solid ${sel ? PURPLE : "rgba(255,255,255,0.2)"}`,
                      background: sel ? PURPLE : "transparent",
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {sel && (
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "white",
                        }}
                      />
                    )}
                  </div>
                  {option}
                </div>
              );
            })}
          </div>
        )}

        {/* TEXT interaction */}
        {isText && (
          <div
            ref={inputRef}
            style={{
              minHeight: 42,
              borderRadius: 10,
              border: `1.5px solid ${
                isActive ? PURPLE_BORDER : "rgba(255,255,255,0.08)"
              }`,
              background: isActive ? PURPLE_BG : "rgba(255,255,255,0.02)",
              padding: "0.6rem 0.85rem",
              display: "flex",
              alignItems: "center",
              transition: "all 0.35s ease",
              boxShadow: isActive ? PURPLE_GLOW : "none",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.5,
              }}
            >
              {displayText}
            </span>
            {showCaret && (
              <span
                style={{
                  display: "inline-block",
                  width: 1.5,
                  height: 14,
                  background: PURPLE,
                  marginLeft: 2,
                  borderRadius: 1,
                  animation: "caretBlink 0.8s ease-in-out infinite",
                }}
              />
            )}
          </div>
        )}

        {/* Animated cursor — hidden on mobile */}
        <motion.div
          style={{
            display: isMobile ? "none" : undefined,
            position: "absolute",
            left: cursorPos.x,
            top: cursorPos.y,
            pointerEvents: "none",
            zIndex: 10,
          }}
          animate={{
            left: cursorPos.x,
            top: cursorPos.y,
            opacity: cursorVisible ? cursorOpacity : 0,
            scale: clicking ? 0.82 : 1,
          }}
          transition={{
            left:
              cursorTransitionMode === "spring"
                ? { type: "spring", stiffness: 100, damping: 16, mass: 0.9 }
                : { duration: 0 },
            top:
              cursorTransitionMode === "spring"
                ? { type: "spring", stiffness: 100, damping: 16, mass: 0.9 }
                : { duration: 0 },
            opacity:
              cursorTransitionMode === "fadeOut"
                ? { duration: CURSOR_FADEOUT_DURATION_S, ease: "easeOut" }
                : { duration: 0.3 },
            scale: {
              duration: 0.12,
              ease: "easeInOut",
            },
          }}
        >
          {cursorShape === "ibeam" ? (
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <line
                x1="2"
                y1="2"
                x2="10"
                y2="2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="2"
                x2="6"
                y2="18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="2"
                y1="18"
                x2="10"
                y2="18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path
                d="M0 0L0 16L4 12.5L6.5 18L8.5 17L6 11L10.5 10.5L0 0Z"
                fill="white"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="1"
              />
            </svg>
          )}
        </motion.div>
      </div>

      {/* Card footer — Start CTA (desktop only; mobile renders standalone button outside card) */}
      <div className="hidden lg:block shrink-0 border-t border-white/10 px-6 py-4">
        <Link
          href="/introspect"
          className="group flex items-center justify-between text-sm text-white/50 transition-colors duration-200 hover:text-white/90"
        >
          <span>Start Introspect</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
