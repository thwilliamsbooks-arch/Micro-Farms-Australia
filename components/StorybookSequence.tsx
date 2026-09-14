"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

type Chapter = {
  image?: string;
  video?: string;
  text: string;
  number: string;
  textAlign: "left" | "center" | "right";
  textVAlign: "top" | "middle" | "bottom";
  gradient: "to-top" | "to-bottom" | "to-right" | "to-left";
  italic: boolean;
  size: "medium" | "large" | "xlarge";
};

const chapters: Chapter[] = [
  {
    image: "/images/story-1.jpg",
    text: "Once, it was just a backyard.",
    number: "I",
    textAlign: "center",
    textVAlign: "bottom",
    gradient: "to-top",
    italic: true,
    size: "large",
  },
  {
    image: "/images/story-2.jpg",
    text: "Then we planted something.",
    number: "II",
    textAlign: "left",
    textVAlign: "middle",
    gradient: "to-right",
    italic: false,
    size: "medium",
  },
  {
    image: "/images/story-3.jpg",
    text: "The garden began to thrive.",
    number: "III",
    textAlign: "center",
    textVAlign: "top",
    gradient: "to-bottom",
    italic: true,
    size: "xlarge",
  },
  {
    image: "/images/story-4.jpg",
    text: "The chickens arrived.",
    number: "IV",
    textAlign: "right",
    textVAlign: "middle",
    gradient: "to-left",
    italic: false,
    size: "large",
  },
  {
    image: "/images/story-5.jpg",
    text: "The bees came home.",
    number: "V",
    textAlign: "center",
    textVAlign: "bottom",
    gradient: "to-top",
    italic: true,
    size: "medium",
  },
  {
    video: "/videos/farm-story.mp4",
    text: "And then, the whole family gathered.",
    number: "VI",
    textAlign: "center",
    textVAlign: "middle",
    gradient: "to-top",
    italic: false,
    size: "large",
  },
];

const gradientMap = {
  "to-top":
    "linear-gradient(to top, rgba(42,31,20,0.85) 0%, rgba(42,31,20,0.2) 55%, transparent 100%)",
  "to-bottom":
    "linear-gradient(to bottom, rgba(42,31,20,0.75) 0%, rgba(42,31,20,0.15) 55%, transparent 100%)",
  "to-right":
    "linear-gradient(to right, rgba(42,31,20,0.8) 0%, rgba(42,31,20,0.15) 55%, transparent 100%)",
  "to-left":
    "linear-gradient(to left, rgba(42,31,20,0.8) 0%, rgba(42,31,20,0.15) 55%, transparent 100%)",
};

const sizeMap = {
  medium: "clamp(2rem, 4.5vw, 3.5rem)",
  large: "clamp(2.5rem, 5.5vw, 4.5rem)",
  xlarge: "clamp(3rem, 7vw, 6rem)",
};

const hAlignMap = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const vAlignMap = {
  top: "items-start",
  middle: "items-center",
  bottom: "items-end",
};

const paddingMap = {
  left: "pl-10 md:pl-20 pr-10",
  center: "px-8 md:px-20",
  right: "pr-10 md:pr-20 pl-10",
};

const vPaddingMap = {
  top: "pt-24 pb-8",
  middle: "py-8",
  bottom: "pb-20 pt-8",
};

function Chapter({
  chapter,
  index,
  onActive,
}: {
  chapter: Chapter;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const opacityRaw = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.65, 0.88],
    [0, 1, 1, 0]
  );
  const scaleRaw = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.65, 0.88],
    [0.97, 1, 1, 0.97]
  );

  const y = prefersReduced ? 0 : yRaw;
  const opacity = prefersReduced ? 1 : opacityRaw;
  const scale = prefersReduced ? 1 : scaleRaw;

  const gradientStyle = gradientMap[chapter.gradient as keyof typeof gradientMap];

  // The source video already has this chapter's caption burned into its opening
  // title-card frames (from the original video-generation step). Rendering the same
  // caption again as an HTML overlay duplicates it on screen for as long as the
  // looping video is in that title-card window, so we keep the text for screen
  // readers only and let the video be the sole visible instance.
  if (chapter.video) {
    return (
      <div ref={ref} className="relative h-screen min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-[#2A1F14]">
          <video
            src={chapter.video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: gradientStyle }} />
        <p className="sr-only">{chapter.text}</p>
        <div className="absolute bottom-6 right-8">
          <span
            className="text-[#FAF6EE]/25 text-sm tracking-[0.3em]"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic" }}
          >
            {chapter.number}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-screen min-h-[500px] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-[#2A1F14]"
        style={{ y }}
      >
        <Image
          src={chapter.image!}
          alt={chapter.text}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: gradientStyle }}
      />

      {/* Chapter text */}
      <div
        className={`absolute inset-0 flex ${vAlignMap[chapter.textVAlign]} ${hAlignMap[chapter.textAlign]} ${paddingMap[chapter.textAlign]} ${vPaddingMap[chapter.textVAlign]}`}
      >
        <motion.div style={{ opacity, scale }}>
          <p
            className="text-[#FAF6EE] leading-[1.1]"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: sizeMap[chapter.size as keyof typeof sizeMap],
              fontStyle: chapter.italic ? "italic" : "normal",
              letterSpacing: "-0.01em",
              maxWidth: "18ch",
              textAlign:
                chapter.textAlign === "center"
                  ? "center"
                  : chapter.textAlign === "right"
                  ? "right"
                  : "left",
            }}
          >
            {chapter.text}
          </p>
        </motion.div>
      </div>

      {/* Chapter number — subtle, lower opposite corner from text */}
      <div
        className={`absolute bottom-6 ${
          chapter.textAlign === "right" ? "left-8" : "right-8"
        }`}
      >
        <span
          className="text-[#FAF6EE]/25 text-sm tracking-[0.3em]"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {chapter.number}
        </span>
      </div>
    </div>
  );
}

export default function StorybookSequence() {
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerInView = useInView(containerRef, { amount: 0.05 });

  const handleActive = useCallback((index: number) => {
    setActiveChapter(index);
  }, []);

  return (
    <>
      {/* Fixed side progress indicator */}
      <AnimatePresence>
        {containerInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none"
            aria-hidden="true"
          >
            {chapters.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: i === activeChapter ? 24 : 6,
                  opacity: i === activeChapter ? 0.9 : 0.3,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-px bg-[#FAF6EE] rounded-full origin-top"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef}>
        {chapters.map((chapter, i) => (
          <Chapter
            key={chapter.number}
            chapter={chapter}
            index={i}
            onActive={handleActive}
          />
        ))}
      </div>
    </>
  );
}
