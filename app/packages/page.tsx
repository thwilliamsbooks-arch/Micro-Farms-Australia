"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import CTABanner from "@/components/CTABanner";

const packages = [
  {
    tag: "Own It",
    subtitle: "Buy Outright",
    description:
      "Pay once, own everything from day one. The simplest, most direct path to your own micro farm.",
    features: [
      "In-depth backyard design consultation",
      "Full installation by our experienced team",
      "Chicken coop, flock of 4–6 laying hens",
      "2–4 raised garden beds with starter plants",
      "Flow Hive beehive & bees (optional add-on)",
      "Mini cow or milking sheep (¼ acre+ properties)",
      "Composting system & integrated ecosystem design",
      "Immediate full ownership of all elements",
      "Starter guide, training session & care manual",
      "30-day post-install support included",
    ],
    payment: "Single upfront payment. No ongoing fees.",
    paymentNote: "Custom quote — every backyard is different.",
  },
  {
    tag: "Grow Into It",
    subtitle: "Payment Plan",
    description:
      "Your complete micro farm installed today. Spread the cost over 12–36 months. Full ownership at the end.",
    features: [
      "Everything in Own It",
      "Flexible terms: 12, 24, or 36 months",
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
    paymentNote: "Interest-free options available. Contact us.",
  },
  {
    tag: "Experience It",
    subtitle: "Full Rental",
    description:
      "All the joy of a micro farm with zero long-term commitment. We set up, you enjoy, we remove when you're done.",
    features: [
      "Full setup tailored to your space",
      "Chickens, garden beds, beehive included",
      "We handle all ongoing maintenance",
      "Seasonal planting & harvest guidance",
      "Monthly farm check-in included",
      "All animals remain our responsibility",
      "Fully relocatable when you move",
      "Clean, professional removal when done",
      "Month-to-month or 6/12-month fixed term",
      "Upgrade to ownership anytime",
    ],
    payment: "Monthly rental fee, maintenance included.",
    paymentNote: "No setup fee for 12-month terms.",
  },
];

const faqs = [
  {
    question: "Do I need council approval?",
    answer:
      "Regulations vary by council and what you want to keep. Chickens (usually up to 6 hens, no roosters) are permitted in most residential areas across Australia. Beehives are allowed in most areas with basic placement requirements. Mini cows may require rural residential or hobby farm zoning. We help you research your council's specific requirements during your free consultation.",
  },
  {
    question: "Can I get a mini cow if I'm renting?",
    answer:
      "Mini cows require at least a quarter acre and appropriate zoning — not suitable for standard rental properties. However, if you're renting a rural residential or hobby farm property, it may be possible. For renters in standard suburban blocks, we recommend starting with chickens, garden beds, and bees under our rental package.",
  },
  {
    question: "How much space do I need?",
    answer:
      "You can have a meaningful micro farm on surprisingly little space. Garden beds and a small chicken coop work well on 200–300m². Beehives can be added from around 300m². For a mini cow, we recommend a minimum of a quarter acre of usable space. During your consultation, we'll assess exactly what's possible for your specific yard.",
  },
  {
    question: "What happens if I want to cancel the rental?",
    answer:
      "Month-to-month rental agreements can be cancelled with 30 days notice. Fixed-term agreements may have early termination fees — we're transparent about this upfront. When you end the rental, we professionally remove all elements from your property within 5 business days, leaving your backyard as we found it.",
  },
  {
    question: "Are mini cows really suitable as pets?",
    answer:
      "Genuinely, yes. Mini Jersey and Highland breeds are known for exceptionally gentle temperaments. They bond strongly with their families, enjoy being patted and spending time with people, and are manageable for adults and children alike. Many of our customers describe their mini cow as the most beloved member of the household.",
  },
  {
    question: "What does ongoing maintenance look like?",
    answer:
      "For Own It and Grow Into It packages, we provide thorough training so you're fully self-sufficient — most families spend 20–30 minutes daily on farm tasks, which becomes a joyful ritual rather than a chore. For Rental, we handle all ongoing maintenance: health checks, feed supply, seasonal replanting, and hive inspections. You simply enjoy the abundance.",
  },
  {
    question: "How long does a full installation take?",
    answer:
      "A standard installation (garden beds, chicken coop, beehive) typically takes 1–2 days. Larger setups including mini cows or extensive custom builds may take 2–3 days. We coordinate everything — materials delivery to animal transport. Most customers are enjoying their first eggs within 2–3 weeks of installation.",
  },
];

export default function PackagesPage() {
  return (
    <div style={{ backgroundColor: "#FAF6EE" }}>
      {/* Page header */}
      <section className="pt-36 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              How it works
            </p>
            <h1
              className="text-[#3D2B1F] leading-[1.1] mb-6"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Three ways to bring your farm home.
            </h1>
            <p
              className="text-[#3D2B1F]/50 text-sm leading-[1.8]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              Every backyard is different. Every family is different. That&apos;s why
              we offer three flexible paths to the same destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package columns */}
      <section
        className="px-6 lg:px-12 pb-28"
        style={{ borderTop: "1px solid rgba(61,43,31,0.1)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#3D2B1F]/10">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col px-0 md:px-10 first:pl-0 last:pr-0 py-12 md:py-14 first:pt-12 last:pb-12"
              >
                <div className="flex-1">
                  <p
                    className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                  >
                    {pkg.subtitle}
                  </p>

                  <h2
                    className="text-[#3D2B1F] mb-4"
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontWeight: 400,
                      fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    }}
                  >
                    {pkg.tag}
                  </h2>

                  <p
                    className="text-[#3D2B1F]/55 text-sm leading-[1.75] mb-8"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-[#3D2B1F]/60"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D4A24C] flex-none" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-8">
                    <p
                      className="text-[#3D2B1F]/70 text-sm mb-1"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                    >
                      {pkg.payment}
                    </p>
                    <p
                      className="text-[#8B6F47] text-sm"
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 300,
                      }}
                    >
                      {pkg.paymentNote}
                    </p>
                  </div>
                </div>

                <Link
                  href="/free-inspection"
                  className="text-center text-xs tracking-[0.2em] uppercase border border-[#3D2B1F]/25 text-[#3D2B1F] py-3 hover:border-[#D4A24C] hover:text-[#D4A24C] transition-all"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                >
                  Get a custom quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section
        style={{ backgroundColor: "#E8DCC8", borderTop: "1px solid rgba(61,43,31,0.08)" }}
        className="py-24 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            Elements
          </p>
          <h2
            className="text-[#3D2B1F] mb-12"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            What we can install for you.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {[
              { name: "Chicken Flock", note: "4–6 laying hens with coop" },
              { name: "Raised Garden Beds", note: "Timber frames, starter plants" },
              { name: "Flow Hive", note: "Beehive with colony and training" },
              { name: "Miniature Cow", note: "Quarter-acre properties only" },
              { name: "Milking Sheep", note: "Alternative dairy option" },
              { name: "Composting", note: "Worm farm and compost system" },
              { name: "Irrigation", note: "Automated watering" },
              { name: "Pollinator Garden", note: "Native flowers for the bees" },
            ].map((item) => (
              <div key={item.name} className="border-t border-[#3D2B1F]/12 pt-5">
                <p
                  className="text-[#3D2B1F] text-sm mb-1"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                >
                  {item.name}
                </p>
                <p
                  className="text-[#8B6F47] text-xs"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            Questions
          </p>
          <h2
            className="text-[#3D2B1F] mb-14"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Frequently asked.
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
