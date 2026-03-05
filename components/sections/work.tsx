// components/sections/work.tsx — Portfolio showcase: Caramel & Jo, Mi Gente Bonita Market
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSITION_REVEAL, VIEWPORT_REVEAL, DURATION_MICRO } from "@/lib/animations";

type HighlightPlacement = {
  imageIndex: number;
  top: number;
  left: number;
  /** Optional: tooltip prefers left/right to avoid overflow */
  tooltipSide?: "left" | "right" | "top" | "bottom";
};

const PROJECTS = [
  {
    id: "caramelandjo",
    name: "Caramel & Jo",
    tagline: "E-commerce for a Delaware bakery",
    url: "https://caramelandjo.com",
    linkLabel: "caramelandjo.com",
    images: [
      { src: "/images/work/caramelandjo-mobile-hero.jpg", alt: "Caramel & Jo mobile homepage with hero dessert image" },
      { src: "/images/work/caramelandjo-mobile-product.jpg", alt: "Caramel & Jo mobile product page for Flan with size and garnish options" },
      { src: "/images/work/caramelandjo-mobile-checkout.jpg", alt: "Caramel & Jo mobile checkout form with delivery options" },
    ],
    highlights: [
      {
        text: "Web app designed to feel native in mobile Safari/Chrome — custom bottom nav, full-width imagery, touch-optimized controls",
        placement: { imageIndex: 0, top: 12, left: 50, tooltipSide: "bottom" as const },
      },
      {
        text: "Strategic CTA placement, prominent in the footer; language toggle (EN/ES) for reach.",
        placement: { imageIndex: 0, top: 76, left: 82, tooltipSide: "top" as const },
      },
      {
        text: "Warm color palette (gold, tan, berry accents) aligned with brand; high-contrast product photography for conversion",
        placement: { imageIndex: 1, top: 38, left: 50, tooltipSide: "bottom" as const },
      },
      {
        text: "Semantic structure, metadata, and Roboto for readability — optimized for SEO and AI agent parsing",
        placement: { imageIndex: 2, top: 42, left: 50, tooltipSide: "top" as const },
      },
    ],
  },
  {
    id: "migentebonita",
    name: "Mi Gente Bonita Market",
    tagline: "Local Mexican grocery — Newark & Wilmington",
    url: "https://migentebonitamarket.com",
    linkLabel: "migentebonitamarket.com",
    images: [
      { src: "/images/work/migentebonita-mobile-home.jpg", alt: "Mi Gente Bonita Market mobile homepage with hero and primary CTAs" },
      { src: "/images/work/migentebonita-mobile-nav.jpg", alt: "Mi Gente Bonita Market mobile navigation drawer with contact and social links" },
      { src: "/images/work/migentebonita-mobile-contact.jpg", alt: "Mi Gente Bonita Market contact page with hours, phone numbers, and embedded map" },
    ],
    highlights: [
      {
        text: "Red CTAs for urgency (Horario, Productos, Llámanos); green for clickable phone numbers; social buttons use platform colors",
        placement: { imageIndex: 0, top: 72, left: 50, tooltipSide: "top" as const },
      },
      {
        text: "Native app–like mobile experience: drawer navigation, stacked action buttons, thumb-friendly tap targets",
        placement: { imageIndex: 1, top: 25, left: 25, tooltipSide: "right" as const },
      },
      {
        text: "Clear hierarchy: contact info, hours, and map in scannable cards; Open in Maps as primary next action",
        placement: { imageIndex: 2, top: 58, left: 50, tooltipSide: "top" as const },
      },
      {
        text: "Structured content and readable typography for discoverability and AI-friendly metadata",
        placement: { imageIndex: 2, top: 22, left: 50, tooltipSide: "bottom" as const },
      },
    ],
  },
] as const;

function Hotspot({
  index,
  text,
  top,
  left,
  tooltipSide = "top",
  isActive,
  onActivate,
  onDeactivate,
}: {
  index: number;
  text: string;
  top: number;
  left: number;
  tooltipSide?: "left" | "right" | "top" | "bottom";
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const tooltipClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[tooltipSide];

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${top}%`, left: `${left}%` }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
    >
      <button
        type="button"
        onClick={() => (isActive ? onDeactivate() : onActivate())}
        onBlur={() => onDeactivate()}
        aria-label={`Highlight ${index + 1}: ${text.slice(0, 60)}...`}
        aria-expanded={isActive}
        className={`
          flex h-8 w-8 shrink-0 items-center justify-center rounded-full
          border-2 border-white/90 bg-accent text-xs font-semibold text-white
          shadow-lg ring-2 ring-accent/30 transition-all duration-200
          hover:scale-110 hover:ring-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
          ${isActive ? "scale-110 ring-accent/50" : ""}
        `}
      >
        {index + 1}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: tooltipSide === "top" ? 4 : tooltipSide === "bottom" ? -4 : 0, x: tooltipSide === "left" ? 4 : tooltipSide === "right" ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: tooltipSide === "top" ? 4 : tooltipSide === "bottom" ? -4 : 0, x: tooltipSide === "left" ? 4 : tooltipSide === "right" ? -4 : 0 }}
            transition={{ duration: DURATION_MICRO, ease: [0.25, 0.1, 0.25, 1] }}
            className={`absolute z-20 min-w-[180px] max-w-[240px] ${tooltipClasses}`}
          >
            <div className="rounded-lg bg-text-primary/95 px-3 py-2.5 text-xs font-medium leading-snug text-white shadow-xl backdrop-blur-sm">
              {text}
            </div>
            <div
              className={`
                absolute h-0 w-0 border-[6px] border-transparent
                ${tooltipSide === "top" ? "left-1/2 top-full -translate-x-1/2 border-t-text-primary" : ""}
                ${tooltipSide === "bottom" ? "left-1/2 bottom-full -translate-x-1/2 border-b-text-primary" : ""}
                ${tooltipSide === "left" ? "left-full top-1/2 -translate-y-1/2 border-l-text-primary" : ""}
                ${tooltipSide === "right" ? "right-full top-1/2 -translate-y-1/2 border-r-text-primary" : ""}
              `}
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ImageWithHotspots({
  src,
  alt,
  highlights,
  imageIndex,
}: {
  src: string;
  alt: string;
  highlights: ReadonlyArray<{ text: string; placement: HighlightPlacement }>;
  imageIndex: number;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const relevantHighlights = highlights
    .map((h, i) => ({ ...h, originalIndex: i }))
    .filter((h) => h.placement.imageIndex === imageIndex);

  return (
    <div className="group relative aspect-9/19 overflow-visible rounded-lg border border-border bg-surface">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 33vw, 200px"
          quality={90}
          placeholder="empty"
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0" aria-hidden>
        {relevantHighlights.map(({ text, placement, originalIndex }) => (
          <Hotspot
            key={originalIndex}
            index={originalIndex}
            text={text}
            top={placement.top}
            left={placement.left}
            tooltipSide={placement.tooltipSide}
            isActive={activeIndex === originalIndex}
            onActivate={() => setActiveIndex(originalIndex)}
            onDeactivate={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_REVEAL}
      transition={{ ...TRANSITION_REVEAL, delay: index * 0.08 }}
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
    >
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{project.tagline}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {project.linkLabel ?? "View site"}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <p className="text-xs text-text-muted sm:max-w-[200px]">
          Hover or tap the numbered spots on each screen to explore key features.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 border-t border-border bg-surface-raised p-4 sm:gap-4">
        {project.images.map((img, i) => (
          <ImageWithHotspots
            key={i}
            src={img.src}
            alt={img.alt}
            highlights={project.highlights}
            imageIndex={i}
          />
        ))}
      </div>
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={TRANSITION_REVEAL}
          className="mb-8"
        >
          <h2 className="text-center text-2xl font-semibold text-text-primary">
            Our Work
          </h2>
          <p className="mt-2 text-text-secondary">
            Custom web apps for Delaware businesses — designed to look and feel
            like native mobile apps when used in Safari or Chrome. Responsive
            layouts, strategic CTAs, and technical polish for SEO and AI agents.
          </p>
        </motion.div>
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={TRANSITION_REVEAL}
          className="mt-8"
        >
          <a
            href="/introspect"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            Get a Quote →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
