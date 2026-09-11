"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="relative z-50 border-b border-white/10 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-semibold tracking-tight text-black"
        >
          Venu Trinity
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-sm text-gray-500 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="text-2xl text-black md:hidden"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 top-full w-full border-b border-black/10 bg-white px-6 py-6 shadow-lg md:hidden">
            <div className="flex flex-col gap-5 text-sm text-gray-500">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="transition-colors hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}