"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section style={{ backgroundColor: "#FAF6EE" }} className="py-24 md:py-40">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-8"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            Your backyard is waiting
          </p>

          <h2
            className="text-[#3D2B1F] leading-[1.1] mb-10"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            Ready to begin?
          </h2>

          <p
            className="text-[#3D2B1F]/50 text-sm leading-[1.85] max-w-sm mx-auto mb-12"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
          >
            Book a free, no-obligation consultation. We&apos;ll assess your
            space, understand your dreams, and design your perfect micro farm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-inspection"
              className="text-xs tracking-[0.25em] uppercase border border-[#3D2B1F]/30 text-[#3D2B1F] px-10 py-4 hover:border-[#D4A24C] hover:text-[#D4A24C] transition-all"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Book a free consultation
            </Link>
            <Link
              href="/packages"
              className="text-xs tracking-[0.25em] uppercase text-[#8B6F47]/60 px-10 py-4 hover:text-[#3D2B1F] transition-colors"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              View packages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
