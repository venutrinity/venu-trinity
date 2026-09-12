"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const projects = [
  {
    number: "01",
    category: "Graphic Design",
    title: "Visual identities that make brands memorable.",
    description:
      "Posters, thumbnails, campaigns and visual systems crafted with a strong creative direction.",
    size: "md:col-span-2",
  },
  {
    number: "02",
    category: "Video Editing",
    title: "Stories designed to move.",
    description:
      "Short-form content, cinematic edits and motion-led storytelling.",
    size: "",
  },
  {
    number: "03",
    category: "Web Development",
    title: "Digital experiences built around people.",
    description:
      "Modern websites with clean interfaces, thoughtful interactions and responsive experiences.",
    size: "",
  },
  {
    number: "04",
    category: "Branding",
    title: "From an idea to a complete identity.",
    description:
      "Logo systems, typography, colour direction and brand applications.",
    size: "md:col-span-2",
  },
];

const categories = [
  "All",
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Branding",
];

export default function Portfolio() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-white/30" />

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Portfolio
                </p>
              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[110px]">
                Selected work.
                <br />
                <span className="text-white/25">
                  Built with purpose.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/40 md:text-lg md:leading-8">
                A collection of visual identities, digital experiences,
                creative campaigns and stories created by Venu Trinity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category filter */}
        <section className="border-y border-white/10">
          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-5 md:px-10">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`whitespace-nowrap text-xs transition-colors duration-300 ${
                  index === 0
                    ? "text-white"
                    : "text-white/35 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Portfolio grid */}
        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group ${project.size}`}
                >
                  {/* Visual */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080808]">
                    {/* Grid */}
                    <div className="absolute inset-0 opacity-[0.045] transition-transform duration-1000 group-hover:scale-105">
                      <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:55px_55px]" />
                    </div>

                    {/* Ambient glow */}
                    <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[90px] transition-all duration-700 group-hover:h-72 group-hover:w-72 group-hover:bg-white/[0.07]" />

                    {/* Placeholder visual */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.04 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-md md:h-44 md:w-44">
                        <div className="absolute inset-3 rounded-full border border-white/[0.06]" />

                        <span className="text-4xl font-semibold tracking-[-0.08em] text-white/15 transition-colors duration-500 group-hover:text-white/30 md:text-5xl">
                          VT
                        </span>
                      </div>
                    </motion.div>

                    {/* Project number */}
                    <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em] text-white/35">
                      {project.number}
                    </span>

                    {/* Arrow */}
                    <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </div>

                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Category */}
                    <div className="absolute bottom-6 left-6">
                      <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/40">
                        {project.category}
                      </p>

                      <p className="text-xs text-white/25">
                        Explore project
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-1 pb-8 pt-6 md:pb-12">
                    <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-[-0.025em] text-white/90 md:text-3xl">
                      {project.title}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/35">
                      {project.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Have a project in mind?
            </p>

            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
                Let&apos;s create something
                <span className="text-white/25"> worth remembering.</span>
              </h2>

              <a
                href="/contact"
                className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                Start a project

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}