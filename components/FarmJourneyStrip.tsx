"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const stages = [
  {
    number: "01",
    image: "/images/journey-1.jpg",
    label: "The Empty Backyard",
    emoji: "🏡",
    color: "#2a2a1a",
  },
  {
    number: "02",
    image: "/images/journey-2.jpg",
    label: "Garden Beds Installed",
    emoji: "🪵",
    color: "#2a3a12",
  },
  {
    number: "03",
    image: "/images/journey-3.jpg",
    label: "The Garden Thrives",
    emoji: "🥦",
    color: "#1e3a10",
  },
  {
    number: "04",
    image: "/images/journey-4.jpg",
    label: "Chickens Arrive",
    emoji: "🐔",
    color: "#3a2a10",
  },
  {
    number: "05",
    image: "/images/journey-5.jpg",
    label: "Bees Move In",
    emoji: "🍯",
    color: "#3a1e08",
  },
  {
    number: "06",
    image: "/images/journey-6.jpg",
    label: "Farm Paradise",
    emoji: "🌾",
    color: "#1a2e0e",
  },
];

export default function FarmJourneyStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p
            className="text-[#c8842a] text-xl mb-3"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            The transformation
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From Bare Backyard to Farm Paradise
          </h2>
          <p className="text-[#f5f0e8]/60 max-w-xl mx-auto">
            Watch your suburban space come alive. Each stage unlocks a new
            layer of abundance and joy.
          </p>
        </motion.div>
      </div>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-16 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {stages.map((stage, i) => (
          <motion.div
            key={stage.number}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="flex-none w-64 sm:w-72 rounded-2xl overflow-hidden border border-[#f5f0e8]/10 group cursor-default"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Image area */}
            <div
              className="relative h-52 overflow-hidden"
              style={{ background: stage.color }}
            >
              <Image
                src={stage.image}
                alt={stage.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => {}}
              />
              {/* Fallback when image missing */}
              <div
                className="absolute inset-0 flex items-center justify-center text-7xl"
                style={{ background: stage.color }}
              >
                {stage.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a0e]/70 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#8aab4a] text-[#1a1a0e] text-xs font-bold px-2 py-1 rounded-full">
                Stage {stage.number}
              </span>
            </div>
            {/* Label */}
            <div className="bg-[#111108] p-5">
              <p
                className="text-[#f5f0e8] font-semibold text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stage.label}
              </p>
              <div className="mt-3 h-0.5 w-8 bg-[#8aab4a] rounded-full group-hover:w-16 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center mt-6 gap-2">
        {stages.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full bg-[#f5f0e8]/20"
            style={{ width: i === 0 ? "2rem" : "0.5rem" }}
          />
        ))}
      </div>
    </section>
  );
}
