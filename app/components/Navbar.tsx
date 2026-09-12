"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "Services", href: "/services" },
  { number: "03", label: "Work", href: "/portfolio" },
  { number: "04", label: "About", href: "/about" },
  { number: "05", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 md:px-6 md:pt-5">
      <motion.nav
        animate={{
          y: scrolled ? 0 : 0,
          scale: scrolled ? 0.985 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-6xl"
      >
        <div
          className={`relative rounded-[1.25rem] border px-4 transition-all duration-500 md:rounded-full md:px-5 ${
            scrolled
              ? "border-white/15 bg-black/80 shadow-2xl shadow-black/30 backdrop-blur-2xl"
              : "border-white/10 bg-black/55 backdrop-blur-xl"
          }`}
        >
          {/* Main navbar row */}
          <div className="flex h-14 items-center justify-between md:h-16">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.1]">
                <span className="text-[10px] font-semibold tracking-[-0.08em] text-white">
                  VT
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </span>

              <span className="text-sm font-medium tracking-[-0.02em] text-white">
                Venu Trinity
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-4 py-2.5 text-xs text-white/45 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}

                  <span className="absolute bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-4" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white/90 md:flex"
            >
              Let&apos;s Talk

              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1] md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm"
                  >
                    ✕
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1"
                  >
                    <span className="block h-px w-4 bg-white/80" />
                    <span className="ml-1 block h-px w-3 bg-white/50" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-white/10 py-4">
                  <div className="flex flex-col">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between border-b border-white/[0.06] py-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-[9px] tracking-[0.2em] text-white/20">
                              {link.number}
                            </span>

                            <span className="text-base text-white/65 transition-colors duration-300 group-hover:text-white">
                              {link.label}
                            </span>
                          </div>

                          <span className="text-sm text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                            ↗
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.25,
                    }}
                    className="pt-5"
                  >
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="group flex items-center justify-between rounded-full bg-white px-5 py-4 text-sm font-medium text-black"
                    >
                      <span>Let&apos;s Talk</span>

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
}