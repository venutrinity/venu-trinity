"use client";

import { motion } from "framer-motion";

const caseStudies = [
  {
    number: "01",
    category: "Branding",
    title: "Building a stronger visual identity.",
    result: "Brand Identity",
  },
  {
    number: "02",
    category: "Web Development",
    title: "Turning a concept into a digital experience.",
    result: "Digital Experience",
  },
  {
    number: "03",
    category: "Digital Marketing",
    title: "Creating content that connects with people.",
    result: "Digital Growth",
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 md:mb-24"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-white/30" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              Case Studies
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-5xl text-4xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
              Ideas are easy.
              <br />
              <span className="text-white/25">
                Execution is everything.
              </span>
            </h2>

            <p className="max-w-xs text-sm leading-6 text-white/30 lg:pb-2">
              A closer look at how creative thinking becomes meaningful
              digital work.
            </p>
          </div>
        </motion.div>

        {/* Case Studies */}
        <div className="border-t border-white/10">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border-b border-white/10"
            >
              {/* Hover background */}
              <div className="pointer-events-none absolute inset-0 -mx-4 rounded-2xl bg-white/[0.025] opacity-0 transition-all duration-500 group-hover:opacity-100 md:-mx-6" />

              <div className="relative grid gap-8 py-10 md:grid-cols-[90px_1fr_220px_60px] md:items-center md:py-14">
                {/* Number */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.3em] text-white/25 transition-colors duration-300 group-hover:text-white/60">
                    {study.number}
                  </span>

                  <span className="h-px w-0 bg-white/30 transition-all duration-500 group-hover:w-6" />
                </div>

                {/* Main content */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-300 group-hover:text-white/50">
                    {study.category}
                  </p>

                  <h3 className="mt-3 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.035em] text-white/70 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white sm:text-3xl md:text-4xl lg:text-[2.8rem]">
                    {study.title}
                  </h3>
                </div>

                {/* Focus */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                    Focus
                  </p>

                  <p className="mt-2 text-sm text-white/45 transition-colors duration-300 group-hover:text-white/70">
                    {study.result}
                  </p>
                </div>

                {/* Arrow */}
                <div>
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 3,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-sm text-white/35 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black"
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-xl text-2xl font-medium leading-tight tracking-[-0.035em] text-white/60 md:text-3xl">
            Good ideas deserve
            <span className="text-white/20"> great execution.</span>
          </p>

          <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Selected thinking / 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}