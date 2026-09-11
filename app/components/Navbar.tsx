"use client";
import { useState } from "react";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="relative border-b border-white/10 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        <h2 className="text-xl font-semibold tracking-tight text-black">
          Venu Trinity
        </h2>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Work</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        {/* Mobile Menu Button */}
    <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-black text-2xl"
    >
        {isOpen ? "✕" : "☰"}
    </button>
    {isOpen && (
  <div className="absolute left-0 top-full w-full bg-white px-6 py-6 md:hidden">
    <div className="flex flex-col gap-5 text-sm text-gray-500">
      <a href="#">Home</a>
      <a href="#">Services</a>
      <a href="#">Work</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </div>
)}

      </nav>
    </header>
  );
}