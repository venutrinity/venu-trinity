"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

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

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          "/api/auth/me",
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Navbar auth check failed:",
          error
        );

        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    checkAuth();
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      setUser(null);
      closeMenu();
      window.location.href = "/";
    }
  }

  const accountHref =
    user?.role === "admin"
      ? "/admin"
      : "/dashboard";

  const accountLabel =
    user?.role === "admin"
      ? "Admin"
      : "Dashboard";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 md:px-6 md:pt-6">
      <motion.nav
        animate={{
          scale: scrolled ? 0.98 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-7xl"
      >
        <div
          className={`relative overflow-hidden rounded-[1.5rem] border transition-all duration-500 md:rounded-full ${
            scrolled
              ? "border-white/15 bg-black/85 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border-white/10 bg-black/45 backdrop-blur-xl"
          }`}
        >
          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Main row */}
          <div className="relative flex h-16 items-center justify-between px-4 md:h-[4.5rem] md:px-6">

            {/* Brand */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <motion.span
                whileHover={{
                  rotate: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]"
              >
                <span className="text-[10px] font-bold tracking-[-0.08em] text-white">
                  VT
                </span>

                <span className="absolute inset-0 rounded-full border border-white/0 transition-all duration-500 group-hover:scale-110 group-hover:border-white/20" />
              </motion.span>

              <span className="hidden text-sm font-medium tracking-[-0.02em] text-white sm:block">
                Venu Trinity
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center md:flex">
              <div className="flex items-center rounded-full border border-white/[0.07] bg-white/[0.025] p-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative rounded-full px-4 py-2.5 text-xs text-white/45 transition-all duration-300 hover:bg-white/[0.07] hover:text-white"
                  >
                    <span className="relative z-10">
                      {link.label}
                    </span>

                    <span className="absolute bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop account actions */}
            <div className="hidden items-center gap-2 md:flex">
              {!authLoading && !user && (
                <Link
                  href="/login"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs text-white/65 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  Login
                </Link>
              )}

              {!authLoading && user && (
                <>
                  <Link
                    href={accountHref}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs text-white/65 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    {accountLabel}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs text-white/45 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    Logout
                  </button>
                </>
              )}

              <Link
                href="/contact"
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white px-5 py-2.5 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white/90"
              >
                <span>Let&apos;s Talk</span>

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() =>
                setIsOpen((value) => !value)
              }
              aria-label={
                isOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={isOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] md:hidden"
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="text-sm text-white"
                  >
                    ✕
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex flex-col gap-1"
                  >
                    <span className="block h-px w-4 bg-white/90" />
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
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-white/10 px-4 pb-5">
                  <div className="flex flex-col">
                    {navLinks.map(
                      (link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{
                            opacity: 0,
                            x: -18,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay:
                              index * 0.055,
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className="group flex items-center justify-between border-b border-white/[0.07] py-4"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-[9px] tracking-[0.2em] text-white/20">
                                {link.number}
                              </span>

                              <span className="text-[15px] text-white/65 transition-colors duration-300 group-hover:text-white">
                                {link.label}
                              </span>
                            </div>

                            <span className="text-sm text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                              ↗
                            </span>
                          </Link>
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Mobile account */}
                  <div className="mt-5 space-y-3">
                    {!authLoading && !user && (
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/70"
                      >
                        <span>Login</span>
                        <span>→</span>
                      </Link>
                    )}

                    {!authLoading && user && (
                      <>
                        <Link
                          href={accountHref}
                          onClick={closeMenu}
                          className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/70"
                        >
                          <span>
                            {accountLabel}
                          </span>

                          <span>→</span>
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/60"
                        >
                          <span>Logout</span>
                          <span>↗</span>
                        </button>
                      </>
                    )}

                    {/* Mobile CTA */}
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="group flex items-center justify-between rounded-full bg-white px-5 py-4 text-sm font-medium text-black"
                    >
                      <span>
                        Start a Project
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
}