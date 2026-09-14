"use client";

import { motion } from "framer-motion";

const features = [
  {
    emoji: "🐔",
    title: "Your Own Eggs",
    description:
      "Fresh eggs every morning from your own free-range flock. Nothing beats the taste of a backyard egg.",
  },
  {
    emoji: "🍯",
    title: "Your Own Honey",
    description:
      "Flow Hive technology makes beekeeping simple, beautiful, and endlessly rewarding.",
  },
  {
    emoji: "🥛",
    title: "Your Own Dairy",
    description:
      "Mini Jersey or Highland cows and milking sheep provide fresh milk, cream, butter, and cheese.",
  },
  {
    emoji: "🥦",
    title: "Your Own Vegetables",
    description:
      "Raised garden beds bursting with seasonal produce, designed to feed your family year-round.",
  },
  {
    emoji: "🌿",
    title: "A Living Ecosystem",
    description:
      "Everything works together: chickens fertilise gardens, bees pollinate, and nature does the rest.",
  },
  {
    emoji: "🏡",
    title: "For Renters Too",
    description:
      "Our mobile setups come with you — or go back with us when you move. No permanence required.",
  },
];

export default function FarmFeatures() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a0e] via-[#111108] to-[#1a1a0e]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#c8842a] text-xl mb-3"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            The farm life is for everyone
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything You Dreamed Of.
            <br />
            <span className="text-[#8aab4a]">Right in Your Backyard.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-[#0f0f08] border border-[#f5f0e8]/8 rounded-2xl p-7 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {feature.emoji}
              </div>
              <h3
                className="text-lg font-bold text-[#f5f0e8] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-[#f5f0e8]/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
