"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
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
              Get in touch
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
              Tell us about your backyard.
            </h1>

            <p
              className="text-[#3D2B1F]/50 text-sm leading-[1.85] mb-12"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              We&apos;ll be in touch within one business day with a free,
              no-obligation consultation. Every quote is tailored to your
              actual space and what you&apos;re dreaming of.
            </p>

            {/* Details */}
            <div className="space-y-6 mb-12">
              {[
                { label: "Response time", value: "Within 1 business day" },
                { label: "Service area", value: "All states & territories" },
                { label: "Consultation", value: "Free, no obligation" },
              ].map((item) => (
                <div key={item.label} className="border-t border-[#3D2B1F]/10 pt-5">
                  <p
                    className="text-[#8B6F47] text-xs tracking-[0.15em] uppercase mb-1"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[#3D2B1F] text-sm"
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
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
