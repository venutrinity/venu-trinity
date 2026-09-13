"use client";

import { motion } from "framer-motion";

const services = [
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Digital Marketing",
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-white/10 pb-20 md:pb-28"
        >
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-white/30" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              Start a Project
            </p>
          </div>

          <h2 className="max-w-6xl text-5xl font-medium leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-8xl lg:text-[8.5rem]">
            Have an idea?
            <br />
            <span className="text-white/20">
              Let&apos;s create it.
            </span>
          </h2>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-base leading-8 text-white/35 md:text-lg">
              Tell us what you&apos;re building, what you need, and where you
              want to go. Let&apos;s turn your idea into something meaningful.
            </p>

            <div className="hidden text-right lg:block">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Venu Trinity
              </p>
              <p className="mt-2 text-sm text-white/35">
                Design × Technology × Growth
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact area */}
        <div className="grid gap-16 pt-16 md:pt-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-sm text-white/40">
              Tell us about your project.
            </p>

            <div className="mt-8">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="group flex items-center gap-4 border-b border-white/[0.07] py-4"
                >
                  <span className="text-[9px] tracking-[0.25em] text-white/20">
                    0{index + 1}
                  </span>

                  <span className="text-sm text-white/40 transition-colors duration-300 group-hover:text-white/80">
                    {service}
                  </span>

                  <span className="ml-auto text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60">
                    ↗
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-white/10 pt-7">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Available for
              </p>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Freelance projects, creative collaborations and digital
                experiences.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-9"
          >
            {/* Name + Email */}
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-[9px] uppercase tracking-[0.25em] text-white/25"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full border-b border-white/10 bg-transparent pb-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-white/50"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-[9px] uppercase tracking-[0.25em] text-white/25"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full border-b border-white/10 bg-transparent pb-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-white/50"
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="contact-service"
                className="text-[9px] uppercase tracking-[0.25em] text-white/25"
              >
                Service
              </label>

              <select
                id="contact-service"
                defaultValue=""
                className="mt-3 w-full border-b border-white/10 bg-black pb-4 text-sm text-white/50 outline-none transition-colors duration-300 focus:border-white/50"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="graphic-design">Graphic Design</option>
                <option value="video-editing">Video Editing</option>
                <option value="web-development">Web Development</option>
                <option value="digital-marketing">
                  Digital Marketing
                </option>
              </select>
            </div>

            {/* Project details */}
            <div>
              <label
                htmlFor="contact-details"
                className="text-[9px] uppercase tracking-[0.25em] text-white/25"
              >
                Project Details
              </label>

              <textarea
                id="contact-details"
                rows={4}
                placeholder="Tell us about your project..."
                className="mt-3 w-full resize-none border-b border-white/10 bg-transparent pb-4 text-sm leading-6 text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-white/50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-between rounded-full bg-white px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 sm:w-auto sm:min-w-[190px]"
            >
              <span>Send Enquiry</span>

              <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </button>
          </motion.form>
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 border-t border-white/10 pt-8 md:mt-28"
        >
          <div className="flex flex-col gap-3 text-[9px] uppercase tracking-[0.25em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
            <span>Let&apos;s make something worth remembering.</span>
            <span>Venu Trinity © 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}