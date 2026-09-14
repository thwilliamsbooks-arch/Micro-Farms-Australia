"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const spreads = [
  {
    image: "/images/eggs.jpg",
    label: "Daily harvest",
    headline: "Fresh eggs, every morning.",
    body: "There is something quietly profound about collecting eggs before breakfast. A small act of self-sufficiency that starts the day differently — grounded, present, connected to something real. Our laying flocks of 4–6 hens produce more than enough for a family year-round.",
    imageLeft: true,
    bg: "#FAF6EE",
  },
  {
    image: "/images/honey.jpg",
    label: "Liquid gold",
    headline: "Honey from your own hive.",
    body: "Flow Hive technology makes backyard beekeeping accessible to anyone. Watch bees work their ancient craft, then turn a tap and watch amber honey fill a jar. It never tastes the same twice — every jar is a season, a garden, a moment in time.",
    imageLeft: false,
    bg: "#E8DCC8",
  },
  {
    image: "/images/dairy.jpg",
    label: "From the paddock",
    headline: "Milk, butter, cheese — from your backyard.",
    body: "If your property is a quarter acre or more, you may qualify for a miniature cow or milking sheep. Mini Jersey and Highland breeds are gentle family animals that produce rich, full-cream milk. The butter is golden. The cheese is yours. The experience is irreplaceable.",
    imageLeft: true,
    bg: "#FAF6EE",
  },
  {
    image: "/images/vegetables.jpg",
    label: "Raised beds",
    headline: "Vegetables that actually taste like vegetables.",
    body: "Raised garden beds designed to produce abundantly in your climate, planted with the varieties your family loves most. The soil is alive. The harvest is real. And the children who grow up eating food they watched come out of the ground are changed by it.",
    imageLeft: false,
    bg: "#E8DCC8",
  },
];

function Spread({
  spread,
  index,
}: {
  spread: (typeof spreads)[0];
  index: number;
}) {
  return (
    <section style={{ backgroundColor: spread.bg }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
            !spread.imageLeft ? "md:[&>:first-child]:order-2" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden"
            style={{ backgroundColor: "#E8DCC8" }}
          >
            <Image
              src={spread.image}
              alt={spread.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              {spread.label}
            </p>

            <h2
              className="text-[#3D2B1F] leading-[1.1]"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              {spread.headline}
            </h2>

            <div
              className="w-8 h-px"
              style={{ backgroundColor: "#D4A24C" }}
            />

            <p
              className="text-[#3D2B1F]/65 leading-[1.75]"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              {spread.body}
            </p>

            <Link
              href="/free-inspection"
              className="self-start text-xs tracking-[0.2em] uppercase text-[#D4A24C] border-b border-[#D4A24C]/50 pb-0.5 hover:border-[#D4A24C] transition-colors"
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

export default function ProductSpread() {
  return (
    <>
      {/* Section header */}
      <section className="bg-[#FAF6EE] pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              This is what's possible
            </p>
            <h2
              className="text-[#3D2B1F]"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                letterSpacing: "-0.01em",
                maxWidth: "22ch",
              }}
            >
              A backyard that feeds your family.
            </h2>
          </motion.div>
        </div>
      </section>

      {spreads.map((spread, i) => (
        <Spread key={spread.label} spread={spread} index={i} />
      ))}
    </>
  );
}
