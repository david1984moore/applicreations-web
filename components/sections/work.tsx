// components/sections/work.tsx — Portfolio showcase: Caramel & Jo, Mi Gente Bonita Market
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  TRANSITION_REVEAL,
  VIEWPORT_REVEAL,
  fadeInUp,
  VIEWPORT_SECTION,
} from "@/lib/animations";

type HighlightPlacement = {
  imageIndex: number;
  top: number;
  left: number;
  tooltipSide?: "left" | "right" | "top" | "bottom";
};

const PROJECTS = [
  {
    id: "caramelandjo",
    name: "Caramel & Jo",
    tagline: "E-commerce for a Delaware bakery",
    synopsis:
      "Custom e-commerce web app built to feel native on mobile. Next.js, responsive design, bilingual (EN/ES) support, and SEO-optimized structure. Warm brand palette and high-contrast product photography drive conversion.",
    url: "https://caramelandjo.com",
    linkLabel: "caramelandjo.com",
    images: [
      {
        src: "/images/work/caramelandjo-mobile-hero.jpg",
        alt: "Caramel & Jo mobile homepage with hero dessert image",
      },
      {
        src: "/images/work/caramelandjo-mobile-product.jpg",
        alt: "Caramel & Jo mobile product page for Flan with size and garnish options",
      },
      {
        src: "/images/work/caramelandjo-mobile-checkout.jpg",
        alt: "Caramel & Jo mobile checkout form with delivery options",
      },
    ],
    highlights: [
      {
        text: "Web app designed to feel native in mobile Safari/Chrome — custom bottom nav, full-width imagery, touch-optimized controls",
        placement: {
          imageIndex: 0,
          top: 12,
          left: 50,
          tooltipSide: "bottom" as const,
        },
      },
      {
        text: "Strategic CTA placement, prominent in the footer; language toggle (EN/ES) for reach.",
        placement: {
          imageIndex: 0,
          top: 76,
          left: 82,
          tooltipSide: "top" as const,
        },
      },
      {
        text: "Warm color palette (gold, tan, berry accents) aligned with brand; high-contrast product photography for conversion",
        placement: {
          imageIndex: 1,
          top: 65,
          left: 88,
          tooltipSide: "top" as const,
        },
      },
      {
        text: "Semantic structure, metadata, and Roboto for readability — optimized for SEO and AI agent parsing",
        placement: {
          imageIndex: 2,
          top: 42,
          left: 50,
          tooltipSide: "top" as const,
        },
      },
    ],
  },
  {
    id: "migentebonita",
    name: "Mi Gente Bonita Market",
    tagline: "Local Mexican grocery — Newark & Wilmington",
    synopsis:
      "Mobile-first info site for a local grocery with hours, contact details, and embedded maps. Drawer navigation, thumb-friendly tap targets, and structured content for discoverability and AI-friendly metadata.",
    url: "https://migentebonitamarket.com",
    linkLabel: "migentebonitamarket.com",
    images: [
      {
        src: "/images/work/migentebonita-mobile-home.jpg",
        alt: "Mi Gente Bonita Market mobile homepage with hero and primary CTAs",
      },
      {
        src: "/images/work/migentebonita-mobile-nav.jpg",
        alt: "Mi Gente Bonita Market mobile navigation drawer with contact and social links",
      },
      {
        src: "/images/work/migentebonita-mobile-contact.jpg",
        alt: "Mi Gente Bonita Market contact page with hours, phone numbers, and embedded map",
      },
    ],
    highlights: [
      {
        text: "Red CTAs for urgency (Horario, Productos, Llámanos); green for clickable phone numbers; social buttons use platform colors",
        placement: {
          imageIndex: 0,
          top: 72,
          left: 12,
          tooltipSide: "top" as const,
        },
      },
      {
        text: "Native app–like mobile experience: drawer navigation, stacked action buttons, thumb-friendly tap targets",
        placement: {
          imageIndex: 1,
          top: 25,
          left: 25,
          tooltipSide: "right" as const,
        },
      },
      {
        text: "Clear hierarchy: contact info, hours, and map in scannable cards; Open in Maps as primary next action",
        placement: {
          imageIndex: 2,
          top: 58,
          left: 50,
          tooltipSide: "top" as const,
        },
      },
      {
        text: "Structured content and readable typography for discoverability and AI-friendly metadata",
        placement: {
          imageIndex: 2,
          top: 22,
          left: 50,
          tooltipSide: "bottom" as const,
        },
      },
    ],
  },
] as const;

function Hotspot({
  index,
  text,
  top,
  left,
  isHovered,
  isPinned,
  onHoverStart,
  onHoverEnd,
  onPinToggle,
}: {
  index: number;
  text: string;
  top: number;
  left: number;
  isHovered: boolean;
  isPinned: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onPinToggle: () => void;
}) {
  const isActive = isHovered || isPinned;

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${top}%`, left: `${left}%` }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <button
        type="button"
        onClick={onPinToggle}
        aria-label={`Highlight ${index + 1}: ${text.slice(0, 60)}...`}
        aria-expanded={isPinned}
        className={`
          flex h-8 w-8 shrink-0 items-center justify-center rounded-full
          border-2 border-white/90 bg-accent text-xs font-semibold text-white
          shadow-lg ring-2 ring-accent/30 transition-all duration-200
          hover:scale-110 hover:ring-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
          ${isActive ? "scale-110 ring-accent/50" : ""}
        `}
      >
        {index + 1}
      </button>
    </div>
  );
}

function ImageWithHotspots({
  src,
  alt,
  highlights,
  imageIndex,
  sizes,
  className = "",
  hoveredIndex,
  pinnedIndex,
  onHoverStart,
  onHoverEnd,
  onPinToggle,
}: {
  src: string;
  alt: string;
  highlights: ReadonlyArray<{ text: string; placement: HighlightPlacement }>;
  imageIndex: number;
  sizes?: string;
  className?: string;
  hoveredIndex: number | null;
  pinnedIndex: number | null;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  onPinToggle: (index: number) => void;
}) {
  const relevantHighlights = highlights
    .map((h, i) => ({ ...h, originalIndex: i }))
    .filter((h) => h.placement.imageIndex === imageIndex);

  return (
    <div
      className={`group relative aspect-9/19 overflow-visible rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-light)] shadow-md ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 640px) 80vw, 280px"}
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
            isHovered={hoveredIndex === originalIndex}
            isPinned={pinnedIndex === originalIndex}
            onHoverStart={() => onHoverStart(originalIndex)}
            onHoverEnd={onHoverEnd}
            onPinToggle={() => onPinToggle(originalIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectPanel({ project }: { project: (typeof PROJECTS)[number] }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hoveredHighlightIndex, setHoveredHighlightIndex] = useState<
    number | null
  >(null);
  const [pinnedHighlightIndex, setPinnedHighlightIndex] = useState<
    number | null
  >(null);

  const displayedIndex = pinnedHighlightIndex ?? hoveredHighlightIndex;
  const displayedHighlight =
    displayedIndex !== null ? project.highlights[displayedIndex] : null;

  const handlePinToggle = (index: number) => {
    setPinnedHighlightIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={TRANSITION_REVEAL}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,160px)_280px_1fr] md:gap-10">
        <div className="order-2 min-w-0 md:order-1 md:flex md:items-center md:pr-4">
          <AnimatePresence mode="wait">
            {displayedHighlight ? (
              <motion.div
                key={displayedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full md:w-[160px] md:shrink-0"
              >
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {displayedHighlight.text}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:justify-start">
          <div className="w-full max-w-[280px]">
            <ImageWithHotspots
              src={project.images[activeImageIndex].src}
              alt={project.images[activeImageIndex].alt}
              highlights={project.highlights}
              imageIndex={activeImageIndex}
              sizes="(max-width: 768px) 80vw, 280px"
              className="w-full"
              hoveredIndex={hoveredHighlightIndex}
              pinnedIndex={pinnedHighlightIndex}
              onHoverStart={setHoveredHighlightIndex}
              onHoverEnd={() => setHoveredHighlightIndex(null)}
              onPinToggle={handlePinToggle}
            />
          </div>
        </div>

        <div className="order-3 flex min-w-0 flex-col gap-5">
          <div>
            <h3 className="font-[family-name:var(--font-dm-serif)] text-3xl text-[var(--color-text-primary)]">
              {project.name}
            </h3>
            <p className="mt-1 text-base text-[var(--color-text-secondary)]">
              {project.tagline}
            </p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {project.linkLabel}
            <span aria-hidden>↗</span>
          </a>
          <div className="flex gap-2">
            {project.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImageIndex(i)}
                aria-label={`View screenshot ${i + 1}`}
                className={`
                  relative aspect-9/19 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                  ${
                    activeImageIndex === i
                      ? "border-accent ring-2 ring-accent/20"
                      : "border-[var(--color-border-light)] opacity-75 hover:opacity-100 hover:border-[var(--color-border-dark)]"
                  }
                `}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
          <p className="wrap-break-word text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {project.synopsis}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Work() {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    PROJECTS[0].id
  );
  const activeIndex = PROJECTS.findIndex((p) => p.id === activeProjectId);

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "Home") {
      e.preventDefault();
      const next = e.key === "Home" ? 0 : Math.max(0, activeIndex - 1);
      setActiveProjectId(PROJECTS[next].id);
    } else if (e.key === "ArrowRight" || e.key === "End") {
      e.preventDefault();
      const next =
        e.key === "End"
          ? PROJECTS.length - 1
          : Math.min(PROJECTS.length - 1, activeIndex + 1);
      setActiveProjectId(PROJECTS[next].id);
    }
  };

  return (
    <section
      id="work"
      className="bg-[var(--color-surface-light)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={TRANSITION_REVEAL}
          className="mb-10 text-left"
        >
          <h2
            className="font-[family-name:var(--font-dm-serif)] text-[var(--color-text-primary)]"
            style={{
              fontSize: "var(--text-section)",
              lineHeight: "var(--leading-section)",
            }}
          >
            Our Work
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            A peek at what we\u2019ve built — custom web apps that feel native on
            your phone. Pick a project below to explore.
          </p>
        </motion.div>

        <div
          role="tablist"
          aria-label="Select a project to view"
          className="mb-8 flex gap-8 border-b border-[var(--color-border-light)]"
          onKeyDown={handleTabKeyDown}
        >
          {PROJECTS.map((project) => {
            const isActive = activeProjectId === project.id;
            return (
              <button
                key={project.id}
                role="tab"
                id={`tab-${project.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${project.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveProjectId(project.id)}
                className={`
                  cursor-pointer border-b-2 pb-2 font-[family-name:var(--font-dm-sans)] text-base font-medium transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                  ${
                    isActive
                      ? "border-accent text-[var(--color-text-primary)]"
                      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }
                `}
              >
                {project.name}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeProjectId}`}
          aria-labelledby={`tab-${activeProjectId}`}
          className="rounded-xl border border-[var(--color-border-light)] p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {PROJECTS.filter((p) => p.id === activeProjectId).map((project) => (
              <ProjectPanel key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="mt-10"
        >
          <Button asChild variant="primary">
            <a href="/introspect">Get Started</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
