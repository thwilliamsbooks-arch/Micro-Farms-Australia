"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@/public/images/mfa-logo-final.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Our Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF6EE]/95 backdrop-blur-sm border-b border-[#3D2B1F]/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={logoSrc}
                alt="Micro Farms Australia"
                priority
                style={{
                  height: "72px",
                  width: "auto",
                  filter: scrolled ? "none" : "brightness(0) invert(1)",
                  transition: "filter 0.5s ease",
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase transition-colors hover:text-[#D4A24C] ${
                  scrolled ? "text-[#3D2B1F]/60" : "text-[#FAF6EE]/70"
                } ${
                  pathname === link.href
                    ? scrolled
                      ? "text-[#3D2B1F]"
                      : "text-[#FAF6EE]"
                    : ""
                }`}
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/free-inspection"
              className={`text-xs tracking-widest uppercase border px-5 py-2 transition-all hover:bg-[#D4A24C] hover:border-[#D4A24C] hover:text-[#FAF6EE] ${
                scrolled
                  ? "border-[#3D2B1F]/30 text-[#3D2B1F]"
                  : "border-[#FAF6EE]/40 text-[#FAF6EE]"
              }`}
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                scrolled ? "bg-[#3D2B1F]" : "bg-[#FAF6EE]"
              } ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                scrolled ? "bg-[#3D2B1F]" : "bg-[#FAF6EE]"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                scrolled ? "bg-[#3D2B1F]" : "bg-[#FAF6EE]"
              } ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#FAF6EE] border-t border-[#3D2B1F]/8"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-widest uppercase transition-colors hover:text-[#D4A24C] ${
                    pathname === link.href ? "text-[#3D2B1F]" : "text-[#3D2B1F]/50"
                  }`}
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/free-inspection"
                className="text-xs tracking-widest uppercase border border-[#3D2B1F]/30 text-[#3D2B1F] px-5 py-3 text-center hover:bg-[#D4A24C] hover:border-[#D4A24C] hover:text-[#FAF6EE] transition-all"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
