"use client";

import { motion } from "framer-motion";

const projects = [
  {
    number: "01",
    category: "Brand Identity",
    title: "Building brands that feel impossible to ignore.",
    description:
      "Visual identity, art direction and creative systems designed for modern brands.",
    size: "md:col-span-2",
  },
  {
    number: "02",
    category: "Digital Experience",
    title: "Digital experiences with purpose.",
    description:
      "Clean interfaces, motion and interaction designed to make brands memorable.",
    size: "",
  },
  {
    number: "03",
    category: "Creative Campaign",
    title: "Ideas transformed into visual stories.",
    description:
      "Campaign concepts, social content and visual communication built to connect.",
    size: "",
  },
];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Selected Work
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
              Ideas turned into
              <br />
              <span className="text-white/30">
                visual experiences.
              </span>
            </h2>
          </div>

          <a
            href="/portfolio"
            className="group flex w-fit items-center gap-3 border-b border-white/20 pb-2 text-sm text-white/60 transition-colors duration-300 hover:border-white/60 hover:text-white"
          >
            View all work

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Projects */}
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] ${project.size}`}
            >
              {/* Visual area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#090909]">
                {/* Background glow */}
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[80px] transition-all duration-700 group-hover:h-72 group-hover:w-72 group-hover:bg-white/[0.06]" />

                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.045]">
                  <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
                </div>

                {/* Center visual placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-sm md:h-40 md:w-40"
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="text-4xl font-semibold tracking-[-0.08em] text-white/20 md:text-5xl">
                      VT
                    </span>
                  </motion.div>
                </div>

                {/* Number */}
                <div className="absolute left-6 top-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                    {project.number}
                  </span>
                </div>

                {/* Arrow */}
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="border-t border-white/10 p-6 md:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />

                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                    {project.category}
                  </p>
                </div>

                <h3 className="max-w-xl text-2xl font-medium leading-tight tracking-[-0.025em] text-white/90 transition-colors duration-300 group-hover:text-white md:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/35">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}