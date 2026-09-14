"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "We always dreamed of the country life. Now we have it — in our little backyard in Ipswich.",
    name: "Sarah & Tom K.",
    location: "Ipswich, QLD",
    bg: "#FAF6EE",
  },
  {
    quote:
      "Collecting eggs with the kids before school has become our favourite part of the day. It changed our whole morning.",
    name: "The Hendersons",
    location: "Mornington, VIC",
    bg: "#E8DCC8",
  },
  {
    quote:
      "We were renting and assumed it wasn't possible. The rental package made it not only possible but completely effortless.",
    name: "Maya T.",
    location: "Penrith, NSW",
    bg: "#F5EDD8",
  },
  {
    quote:
      "We have a miniature Highland and it has completely transformed how our children relate to animals. Worth every cent.",
    name: "David & Claire R.",
    location: "Kenthurst, NSW",
    bg: "#EDE0C8",
  },
];

const NUM = testimonials.length;
// ~130vh per testimonial → 520vh total; scrollable range = (520 - 100)vh = 420vh ≈ 105vh per testimonial
const SECTION_VH = NUM * 130;
const TIMER_INTERVAL = 5000;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion() ?? false;

  // targetIndex: source of truth (scroll position or manual button press)
  // displayedIndex: what's actually rendered; lags 300ms behind for cross-fade
  const [targetIndex, setTargetIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  // Scroll tracking scoped to this section only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Continuous scroll progress → [0, NUM]; floor gives discrete index
  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, NUM]);

  // Drive targetIndex from scroll (skipped when user prefers reduced motion)
  useMotionValueEvent(scrollIndex, "change", (latest) => {
    if (prefersReduced) return;
    const next = Math.min(Math.floor(latest), NUM - 1);
    setTargetIndex(next);
  });

  // Cross-fade: fade out → swap content → fade in
  useEffect(() => {
    if (targetIndex === displayedIndex) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayedIndex(targetIndex);
      setVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [targetIndex, displayedIndex]);

  // Timer-based auto-advance used only when prefers-reduced-motion is active
  const advance = useCallback(() => {
    setTargetIndex((prev) => (prev + 1) % NUM);
  }, []);

  useEffect(() => {
    if (!prefersReduced || paused) return;
    const t = setTimeout(advance, TIMER_INTERVAL);
    return () => clearTimeout(t);
  }, [prefersReduced, paused, displayedIndex, advance]);

  const prev = () => setTargetIndex((i) => (i - 1 + NUM) % NUM);
  const next = () => setTargetIndex((i) => (i + 1) % NUM);

  const t = testimonials[displayedIndex];

  return (
    // Outer div: provides the scroll height that useScroll tracks
    <div
      ref={sectionRef}
      style={{ position: "relative", height: `${SECTION_VH}vh` }}
    >
      {/* Sticky visual container — stays pinned while outer div scrolls past */}
      <section
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: t.bg,
          transition: "background-color 0.7s ease",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Carousel */}
        <div
          className="max-w-4xl mx-auto px-6 lg:px-12"
          style={{ paddingTop: "7rem", paddingBottom: "6rem" }}
        >
          {/* Quote — opacity transition creates the cross-fade */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease",
              minHeight: "260px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <blockquote
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.45,
                color: "#3D2B1F",
                marginBottom: "2.5rem",
                maxWidth: "820px",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "0.68rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(61,43,31,0.5)",
                marginBottom: "0.3rem",
              }}
            >
              {t.name}
            </p>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(61,43,31,0.35)",
              }}
            >
              {t.location}
            </p>
          </div>

          {/* Controls */}
          <div
            className="flex items-center justify-center gap-8"
            style={{ marginTop: "3.5rem" }}
          >
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                color: "rgba(61,43,31,0.35)",
                lineHeight: 1,
                fontSize: "1.1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(61,43,31,0.8)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(61,43,31,0.35)")
              }
            >
              &larr;
            </button>

            {/* Dots reflect targetIndex so they update immediately on scroll threshold */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTargetIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === targetIndex ? "18px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    backgroundColor:
                      i === targetIndex
                        ? "rgba(61,43,31,0.6)"
                        : "rgba(61,43,31,0.18)",
                    transition: "all 0.4s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                color: "rgba(61,43,31,0.35)",
                lineHeight: 1,
                fontSize: "1.1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(61,43,31,0.8)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(61,43,31,0.35)")
              }
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Divider + Mission */}
        <div
          className="max-w-5xl mx-auto px-6 lg:px-12"
          style={{ paddingBottom: "7rem" }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(61,43,31,0.1)",
              marginBottom: "4rem",
            }}
          />
          <div className="text-center">
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.875rem",
                lineHeight: 1.9,
                color: "rgba(61,43,31,0.45)",
                maxWidth: "480px",
                margin: "0 auto 2rem",
              }}
            >
              Our mission is simple: to bring the peace, abundance, and
              tranquility of farm life to every Australian backyard. You
              don&apos;t need acres. You just need a dream — and us.
            </p>
            <Link
              href="/about"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4A24C",
                borderBottom: "1px solid rgba(212,162,76,0.45)",
                paddingBottom: "2px",
                textDecoration: "none",
              }}
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
