"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/config";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-pink/20">
        <nav className="relative z-10 mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          {/* Brand */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender">
              Nails by Pia
            </span>
          </Link>

          {/* Desktop Nav — right-aligned */}
          <ul className="hidden md:flex items-center gap-8 font-sans">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-bold transition-colors hover:text-pink ${
                    pathname === link.href ? "text-pink" : "text-black/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 p-2 relative"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="absolute block w-5 h-0.5 rounded-full bg-gradient-to-r from-[#E84393] to-lavender"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute block w-5 h-0.5 rounded-full bg-gradient-to-r from-[#E84393] to-lavender"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="absolute block w-5 h-0.5 rounded-full bg-gradient-to-r from-[#E84393] to-lavender"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu — slide from right, rendered outside header so it doesn't blur it */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — below header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[45] w-64 bg-cream shadow-xl md:hidden"
            >
              {/* Close button */}
              <div className="flex justify-end px-6 py-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-8 pt-4">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-3 text-lg font-bold transition-colors hover:text-pink font-sans ${
                          pathname === link.href ? "text-pink" : "text-black/70"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
