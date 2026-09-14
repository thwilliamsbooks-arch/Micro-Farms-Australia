"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#2A1F14]">
        <Image
          src="/images/hero.jpg"
          alt="Transformed suburban micro farm at golden hour"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Warm gradient overlay — top band darkens behind navbar, bottom band darkens for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(42,31,20,0.72) 0%, rgba(42,31,20,0) 140px), linear-gradient(to top, rgba(42,31,20,0.75) 0%, rgba(42,31,20,0.25) 50%, rgba(42,31,20,0.05) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#E8DCC8] text-sm tracking-[0.25em] uppercase mb-8"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
        >
          Micro Farms Australia
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="text-[#FAF6EE] leading-[1.1] mb-6"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.01em",
            fontOpticalSizing: "auto",
          }}
        >
          Your Backyard.
          <br />
          <em>Your Farm.</em>
          <br />
          Your Life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-[#E8DCC8]/80 max-w-lg mx-auto leading-relaxed"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          }}
        >
          We transform suburban backyards into thriving micro farm ecosystems.
          Chickens, bees, gardens — and even miniature cows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-10"
        >
          <Link
            href="/free-inspection"
            className="inline-block text-xs tracking-[0.25em] uppercase border border-[#D4A24C] bg-[#D4A24C] text-[#2A1F14] px-10 py-4 hover:bg-transparent hover:text-[#D4A24C] transition-all"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            Get your free backyard assessment
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span
          className="text-[#E8DCC8]/40 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#E8DCC8]/40 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
