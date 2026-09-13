"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Graphic Design",
    description:
      "Visual identities, thumbnails, posters, social media creatives, and brand assets.",
  },
  {
    number: "02",
    title: "Video Editing",
    description:
      "Engaging short-form content, YouTube videos, motion graphics, and visual storytelling.",
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Modern, responsive websites and digital experiences built for growing brands.",
  },
  {
    number: "04",
    title: "Digital Marketing",
    description:
      "Social media, paid advertising, SEO, content strategy, and lead generation.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
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
              What We Do
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-5xl text-4xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
              We create work
              <br />
              <span className="text-white/25">
                that moves people.
              </span>
            </h2>

            <p className="max-w-xs text-sm leading-6 text-white/35 lg:pb-2">
              Strategy, design, technology and storytelling brought together
              to build brands people remember.
            </p>
          </div>
        </motion.div>

        {/* Services list */}
        <div className="border-t border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
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
              <div className="pointer-events-none absolute inset-0 -mx-4 scale-y-75 rounded-2xl bg-white/[0.025] opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100 md:-mx-6" />

              <div className="relative grid gap-7 py-9 md:grid-cols-[90px_1fr_1fr_70px] md:items-center md:gap-8 md:py-12">
                {/* Number */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/25 transition-colors duration-300 group-hover:text-white/60">
                    {service.number}
                  </span>

                  <span className="h-px w-0 bg-white/30 transition-all duration-500 group-hover:w-5" />
                </div>

                {/* Title */}
                <div className="overflow-hidden">
                  <motion.h3
                    whileHover={{ x: 8 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-fit text-2xl font-medium tracking-[-0.035em] text-white/75 transition-colors duration-300 group-hover:text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]"
                  >
                    {service.title}
                  </motion.h3>
                </div>

                {/* Description */}
                <p className="max-w-md text-sm leading-6 text-white/30 transition-colors duration-500 group-hover:text-white/55 md:text-[15px]">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="flex">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 3,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-sm text-white/35 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black"
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-xs leading-5 text-white/25">
            Have a project in mind? Let&apos;s turn the idea into something
            people can&apos;t ignore.
          </p>

          <a
            href="#contact"
            className="group flex w-fit items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-white"
          >
            <span className="border-b border-white/15 pb-1 transition-colors duration-300 group-hover:border-white/50">
              Start a project
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}