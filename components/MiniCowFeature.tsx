"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function MiniCowFeature() {
  return (
    <section style={{ backgroundColor: "#2A1F14" }} className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: "#1A1209" }}
          >
            <Image
              src="/images/mini-cow-closeup.jpg"
              alt="A miniature Highland cow, gentle and close"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle warm vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(42,31,20,0.4) 100%)",
              }}
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              The ultimate addition
            </p>

            <h2
              className="text-[#FAF6EE] leading-[1.1] mb-8"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              Meet your new family member.
            </h2>

            <div className="w-8 h-px bg-[#D4A24C] mb-8" />

            <p
              className="text-[#FAF6EE]/60 leading-[1.8] mb-5"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.95rem",
              }}
            >
              If you have at least a quarter acre, you may qualify for one of
              the most extraordinary additions to suburban life — a miniature
              cow.
            </p>
            <p
              className="text-[#FAF6EE]/60 leading-[1.8] mb-5"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.95rem",
              }}
            >
              Mini Jersey and Highland breeds are gentle, loving animals that
              produce rich milk for the whole family. Fresh cream, homemade
              butter, real cheese — from your own backyard.
            </p>

            <p
              className="text-[#E8DCC8]/70 mb-10"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                fontWeight: 300,
              }}
            >
              They are not livestock. They are family.
            </p>

            {/* Quiet stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 border-t border-[#FAF6EE]/10 pt-8">
              {[
                { value: "4–8 L", label: "Milk daily" },
                { value: "~80 cm", label: "Shoulder height" },
                { value: "20+ yrs", label: "Lifespan" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#FAF6EE] mb-1"
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontWeight: 400,
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[#FAF6EE]/35 text-xs tracking-wide uppercase"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/free-inspection"
              className="inline-block text-xs tracking-[0.25em] uppercase border border-[#D4A24C]/50 text-[#D4A24C] px-8 py-3 hover:bg-[#D4A24C] hover:text-[#2A1F14] hover:border-[#D4A24C] transition-all"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Find out if you qualify
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
