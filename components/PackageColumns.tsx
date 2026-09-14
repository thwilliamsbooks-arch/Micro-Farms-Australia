"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const packages = [
  {
    tag: "Own It",
    subtitle: "Buy Outright",
    description:
      "Pay once, own everything from day one. The simplest, most straightforward path to your own micro farm.",
    features: [
      "Full design consultation",
      "Complete installation by our team",
      "Chicken coop, flock of 4–6 laying hens",
      "2–4 raised garden beds with starter plants",
      "Flow Hive beehive & bees (optional add-on)",
      "Mini cow or milking sheep (¼ acre+ properties)",
      "Composting & integrated ecosystem design",
      "Full ownership from day one",
      "Training session & care manual",
      "30-day post-install support included",
    ],
    payment: "Single upfront payment. No ongoing fees.",
    bgImage: "/images/eggs.jpg",
  },
  {
    tag: "Grow Into It",
    subtitle: "Payment Plan",
    description:
      "Get your full micro farm installed today. Spread the cost over 12–36 months. Full ownership transfers at the end.",
    features: [
      "Everything in Own It",
      "Flexible 12, 24, or 36 month terms",
      "Full installation before first payment",
      "Fixed monthly repayments, no surprises",
      "Full ownership transfers at plan completion",
      "Monthly farm check-in call included",
      "Priority support throughout your plan",
      "Option to upgrade inclusions mid-plan",
      "Early payout available anytime",
      "No balloon payment at the end",
    ],
    payment: "Monthly repayments over 12–36 months.",
    bgImage: "/images/vegetables.jpg",
  },
  {
    tag: "Experience It",
    subtitle: "Full Rental",
    description:
      "All the joy of a micro farm with zero long-term commitment. We set up, you enjoy, we remove when you're done.",
    features: [
      "Full setup tailored to your space",
      "Chickens, garden beds, beehive included",
      "All ongoing maintenance handled by us",
      "Seasonal planting & harvest guidance",
      "Monthly farm check-in included",
      "All animals remain our responsibility",
      "Fully relocatable when you move",
      "Clean, professional removal when done",
      "Month-to-month or fixed-term options",
      "Upgrade to full ownership anytime",
    ],
    payment: "Monthly rental fee. No setup fee on 12-month terms.",
    bgImage: "/images/honey.jpg",
  },
];

export default function PackageColumns() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="bg-[#FAF6EE] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p
            className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            Three ways to farm
          </p>
          <h2
            className="text-[#3D2B1F]"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.01em",
              maxWidth: "24ch",
            }}
          >
            Find the path that fits your life.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
          {packages.map((pkg, i) => {
            const isOpen = openIndex === i;
            const isDeemphasized = openIndex !== null && !isOpen;

            return (
              <motion.div
                key={pkg.tag}
                animate={
                  prefersReduced
                    ? { opacity: isDeemphasized ? 0.55 : 1 }
                    : {
                        opacity: isDeemphasized ? 0.55 : 1,
                        scale: isDeemphasized ? 0.97 : 1,
                      }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => toggle(i)}
                className="relative overflow-hidden cursor-pointer select-none"
                style={{
                  border: "1px solid rgba(61,43,31,0.1)",
                  backgroundColor: "#FAF6EE",
                }}
              >
                {/* Background photo — fades in when expanded */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={pkg.bgImage}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    aria-hidden="true"
                  />
                  {/* Warm cream overlay so text stays readable */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(250,246,238,0.93) 0%, rgba(232,220,200,0.90) 100%)",
                    }}
                  />
                </motion.div>

                {/* Card content */}
                <div className="relative z-10 p-8 md:p-10">

                  {/* Always-visible: label, title, description */}
                  <p
                    className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                  >
                    {pkg.subtitle}
                  </p>

                  <h3
                    className="text-[#3D2B1F] mb-5"
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {pkg.tag}
                  </h3>

                  <p
                    className="text-[#3D2B1F]/55 text-sm"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.75,
                    }}
                  >
                    {pkg.description}
                  </p>

                  {/* Collapsed prompt */}
                  <AnimatePresence initial={false}>
                    {!isOpen && (
                      <motion.div
                        key="prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReduced ? 0 : 0.2 }}
                        className="flex items-center gap-2 mt-7"
                      >
                        <motion.span
                          className="text-[#D4A24C] text-lg leading-none"
                          animate={{ rotate: 0 }}
                          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                        >
                          +
                        </motion.span>
                        <span
                          className="text-[#D4A24C] text-xs tracking-[0.2em] uppercase"
                          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                        >
                          Explore
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="expanded"
                        initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={prefersReduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, ease: "easeOut" },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        {/* Close cue */}
                        <div className="flex items-center gap-2 mt-7 mb-8">
                          <span
                            className="text-[#D4A24C] text-lg leading-none"
                            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300, display: "inline-block", transform: "rotate(45deg)" }}
                          >
                            +
                          </span>
                          <span
                            className="text-[#D4A24C] text-xs tracking-[0.2em] uppercase"
                            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                          >
                            Collapse
                          </span>
                        </div>

                        {/* Feature list */}
                        <ul className="mb-8">
                          {pkg.features.map((f) => (
                            <li
                              key={f}
                              className="text-sm text-[#3D2B1F]/65"
                              style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                fontWeight: 300,
                                lineHeight: 1.6,
                                paddingTop: "0.7rem",
                                paddingBottom: "0.7rem",
                                borderBottom: "1px solid rgba(212,162,76,0.2)",
                              }}
                            >
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* Payment note */}
                        <p
                          className="text-[#8B6F47] text-xs mb-8"
                          style={{
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontStyle: "italic",
                            lineHeight: 1.6,
                          }}
                        >
                          {pkg.payment} Custom quote — every backyard is
                          different.
                        </p>

                        {/* CTA — stop click from bubbling so the card doesn't toggle */}
                        <Link
                          href="/free-inspection"
                          onClick={(e) => e.stopPropagation()}
                          className="block text-center text-xs tracking-[0.2em] uppercase border border-[#3D2B1F]/25 text-[#3D2B1F] py-4 hover:border-[#D4A24C] hover:text-[#D4A24C] transition-all mb-2"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          Get a custom quote
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
