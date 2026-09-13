"use client";

import { motion } from "framer-motion";

const plans = [
  {
    category: "Graphic Design",
    title: "Design Plans",
    description:
      "Creative visuals for brands, creators, and businesses.",
    price: "From ₹999",
    features: [
      "Social Media Designs",
      "YouTube Thumbnails",
      "Posters & Creatives",
    ],
  },
  {
    category: "Video Editing",
    title: "Video Plans",
    description:
      "Professional edits built for modern content.",
    price: "From ₹1,499",
    features: [
      "Short-form Videos",
      "YouTube Videos",
      "Motion Graphics",
    ],
  },
  {
    category: "Web Development",
    title: "Website Plans",
    description:
      "Modern websites designed to grow your business.",
    price: "From ₹4,999",
    features: [
      "Responsive Design",
      "Modern UI",
      "Deployment Support",
    ],
  },
  {
    category: "Digital Marketing",
    title: "Marketing Plans",
    description:
      "Digital strategies that help your brand reach more people.",
    price: "From ₹2,999",
    features: [
      "Social Media Strategy",
      "SEO",
      "Performance Reporting",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[160px]" />

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
          className="mb-16 flex flex-col gap-8 md:mb-24 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                Pricing
              </p>
            </div>

            <h2 className="max-w-5xl text-4xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
              Choose what you need.
              <br />
              <span className="text-white/25">
                Build what matters.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/30 lg:pb-2">
            Flexible creative and digital solutions designed around the
            needs of your project.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.category}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.04] md:p-9"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/[0.035] blur-[70px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] text-white/25 transition-colors duration-300 group-hover:text-white/60">
                    0{index + 1}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] text-white/35 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/60">
                    {plan.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-12 text-3xl font-medium tracking-[-0.04em] text-white/80 transition-colors duration-300 group-hover:text-white md:text-4xl">
                  {plan.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/30 md:text-[15px]">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="mt-9 border-t border-white/10 pt-7">
                  <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-white/20">
                    Includes
                  </p>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 group-hover:text-white/65"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/10 text-[9px] text-white/35">
                          +
                        </span>

                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                      Starting
                    </p>

                    <p className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white">
                      {plan.price}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="group/button flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-white/50 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    <span>Get Started</span>

                    <span className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-white/25">
            Need something custom? We can build a solution around your goals.
          </p>

          <a
            href="#contact"
            className="group flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-white"
          >
            Let&apos;s talk
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}