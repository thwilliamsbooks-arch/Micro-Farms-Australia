"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b"
          style={{ borderColor: "rgba(61,43,31,0.1)" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-8 py-6 text-left hover:text-[#D4A24C] transition-colors group"
          >
            <span
              className="text-[#3D2B1F] text-base group-hover:text-[#D4A24C] transition-colors"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
              }}
            >
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-[#D4A24C] text-xl font-light flex-none leading-none"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p
                  className="text-[#3D2B1F]/60 text-sm leading-[1.8] pb-6"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
