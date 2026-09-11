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
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
            What We Do
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Creative services for
            <br />
            <span className="text-white/35">brands that want more.</span>
          </h2>
        </div>

        {/* Services */}
        <div className="border-t border-white/10">
          {services.map((service) => (
            <div
              key={service.number}
              className="group grid gap-6 border-b border-white/10 py-8 transition md:grid-cols-[80px_1fr_1.2fr_60px] md:items-center md:py-10"
            >
              {/* Number */}
              <span className="text-xs tracking-[0.25em] text-white/30">
                {service.number}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-medium tracking-tight transition duration-300 group-hover:translate-x-2 md:text-3xl">
                {service.title}
              </h3>

              {/* Description */}
              <p className="max-w-lg text-sm leading-6 text-white/40 md:text-base">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                ↗
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-end">
          <a
            href="#contact"
            className="text-sm text-white/50 transition hover:text-white"
          >
            Explore our services →
          </a>
        </div>

      </div>
    </section>
  );
}