"use client";

import { motion } from "framer-motion";
import FreeInspectionForm from "@/components/FreeInspectionForm";

const trustItems = [
  {
    label: "What's included",
    value:
      "A full assessment of your space, tailored micro farm design ideas, and a written quote.",
  },
  { label: "How long it takes", value: "Usually 30–45 minutes, on-site or remote." },
  { label: "Obligation", value: "None. It's genuinely free — no strings attached." },
];

export default function FreeInspectionPage() {
  return (
    <div style={{ backgroundColor: "#FAF6EE" }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28"
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Free inspection &amp; quote
            </p>

            <h1
              className="text-[#3D2B1F] leading-[1.1] mb-8"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              Get your free backyard assessment.
            </h1>

            <p
              className="text-[#3D2B1F]/50 text-sm leading-[1.85] mb-12"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              We&apos;ll visit (or assess your space remotely), design your
              perfect micro farm around it, and hand you a no-obligation
              quote — chickens, garden beds, bees, even a mini cow. It starts
              with one form.
            </p>

            {/* Trust elements */}
            <div className="space-y-6 mb-12">
              {trustItems.map((item) => (
                <div key={item.label} className="border-t border-[#3D2B1F]/10 pt-5">
                  <p
                    className="text-[#8B6F47] text-xs tracking-[0.15em] uppercase mb-1"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[#3D2B1F] text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="text-[#3D2B1F]/50 text-sm"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              &ldquo;You don&apos;t need to move to the country. We can bring
              the country to you.&rdquo;
            </p>
            <p
              className="text-[#8B6F47] text-xs mt-2"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              Trent Williams, Founder
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="bg-white/40 border border-[#3D2B1F]/10 rounded-2xl p-8 lg:p-10"
          >
            <FreeInspectionForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
