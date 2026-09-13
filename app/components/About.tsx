"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Creativity",
    description: "Ideas with a distinct visual point of view.",
  },
  {
    number: "02",
    title: "Technology",
    description: "Digital experiences built with purpose.",
  },
  {
    number: "03",
    title: "Impact",
    description: "Work designed to create real value.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-36"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute right-[-15%] top-1/4 h-[600px] w-[600px] rounded-full bg-white/[0.025] blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-3 md:mb-24"
        >
          <span className="h-px w-8 bg-white/30" />

          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            About Venu Trinity
          </p>
        </motion.div>

        {/* Main story */}
        <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="sticky top-32">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Creative Digital Studio
              </p>

              <motion.div
                whileInView={{ opacity: [0, 1], scale: [0.94, 1] }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 text-[9rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.055] sm:text-[12rem] lg:text-[14rem]"
              >
                VT
              </motion.div>

              <div className="mt-[-2rem] h-px w-24 bg-gradient-to-r from-white/30 to-transparent" />

              <p className="mt-5 max-w-[220px] text-xs leading-5 text-white/25">
                Design. Technology.
                <br />
                Digital growth.
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-5xl text-4xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[5.2rem]"
            >
              We turn creative ideas into{" "}
              <span className="text-white/25">
                digital experiences.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="mt-10 max-w-2xl"
            >
              <p className="text-base leading-8 text-white/50 md:text-lg">
                Venu Trinity is a creative digital studio focused on design,
                technology, and digital growth. We combine creativity with
                practical digital solutions to help brands communicate,
                connect, and grow.
              </p>

              <p className="mt-6 text-base leading-8 text-white/50 md:text-lg">
                From a single visual to a complete digital presence, our goal
                is simple — create work that looks exceptional and delivers
                real value.
              </p>
            </motion.div>

            {/* Values */}
            <div className="mt-16 border-t border-white/10">
              {values.map((value, index) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="group grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[60px_1fr_1.5fr] sm:items-center"
                >
                  <span className="text-[10px] tracking-[0.25em] text-white/25 transition-colors duration-300 group-hover:text-white/60">
                    {value.number}
                  </span>

                  <h3 className="text-xl font-medium tracking-[-0.03em] text-white/70 transition-colors duration-300 group-hover:text-white md:text-2xl">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-6 text-white/30 transition-colors duration-300 group-hover:text-white/50">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing statement */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-14"
            >
              <p className="max-w-2xl text-2xl font-medium leading-tight tracking-[-0.035em] text-white/75 md:text-3xl"
              >
                We don&apos;t just make things look good.
                <span className="text-white/25">
                  {" "}
                  We make them matter.
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}