"use client";

import { motion } from "framer-motion";

const navigation = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Digital Marketing",
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 text-white md:px-10 md:py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Giant closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-white/10 pb-16 md:pb-20"
        >
          <p className="mb-6 text-[9px] uppercase tracking-[0.35em] text-white/25">
            Venu Trinity
          </p>

          <h2 className="max-w-6xl text-4xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-5xl md:text-7xl lg:text-[6.5rem]">
            Make something
            <br />
            <span className="text-white/20">
              worth remembering.
            </span>
          </h2>
        </motion.div>

        {/* Main footer */}
        <div className="grid gap-14 py-14 md:py-16 lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <span className="text-[10px] font-bold tracking-[-0.08em] text-white">
                  VT
                </span>
              </div>

              <span className="text-sm font-medium tracking-[-0.02em]">
                Venu Trinity
              </span>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/30">
              Creative design, digital experiences, and growth solutions for
              modern brands.
            </p>

            <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-white/20">
              Design × Digital × Growth
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-white/25">
              Explore
            </p>

            <div className="space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex w-fit items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-white"
                >
                  <span>{item.label}</span>

                  <span className="translate-x-[-4px] text-xs text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/50">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-white/25">
              Services
            </p>

            <div className="space-y-3">
              {services.map((service) => (
                <p
                  key={service}
                  className="text-sm text-white/40 transition-colors duration-300 hover:text-white/70"
                >
                  {service}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-white/25">
              Connect
            </p>

            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex w-fit items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-white"
                >
                  <span>{social.label}</span>

                  <span className="text-xs text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-7 text-[9px] uppercase tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Venu Trinity. All rights reserved.</p>

          <p>Design • Digital • Growth</p>
        </div>
      </div>
    </footer>
  );
}