"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PackageCardProps {
  icon: string;
  tag: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  delay?: number;
}

export default function PackageCard({
  icon,
  tag,
  name,
  subtitle,
  description,
  features,
  highlighted = false,
  delay = 0,
}: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl p-8 flex flex-col ${
        highlighted
          ? "bg-[#8aab4a] text-[#1a1a0e] shadow-2xl shadow-[#8aab4a]/30"
          : "bg-[#111108] border border-[#f5f0e8]/10 text-[#f5f0e8]"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c8842a] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div className="text-4xl mb-4">{icon}</div>

      <p
        className={`text-xs font-bold uppercase tracking-widest mb-1 ${
          highlighted ? "text-[#1a1a0e]/60" : "text-[#8aab4a]"
        }`}
      >
        {tag}
      </p>

      <h3
        className="text-2xl font-bold mb-1"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {name}
      </h3>

      <p
        className={`text-sm mb-4 ${highlighted ? "text-[#1a1a0e]/70" : "text-[#f5f0e8]/50"}`}
      >
        {subtitle}
      </p>

      <p
        className={`text-sm leading-relaxed mb-6 ${highlighted ? "text-[#1a1a0e]/80" : "text-[#f5f0e8]/70"}`}
      >
        {description}
      </p>

      <ul className="space-y-2 mb-8 flex-1">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2 text-sm ${highlighted ? "text-[#1a1a0e]/80" : "text-[#f5f0e8]/70"}`}
          >
            <span className="mt-0.5 text-base">
              {highlighted ? "✓" : "🌱"}
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/packages"
        className={`text-center py-3 px-6 rounded-full text-sm font-bold transition-all ${
          highlighted
            ? "bg-[#1a1a0e] text-[#f5f0e8] hover:bg-[#2a2a1e]"
            : "bg-[#8aab4a]/20 text-[#8aab4a] border border-[#8aab4a]/30 hover:bg-[#8aab4a] hover:text-[#1a1a0e]"
        }`}
      >
        Learn More
      </Link>
    </motion.div>
  );
}
