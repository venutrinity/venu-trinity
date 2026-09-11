const plans = [
  {
    category: "Graphic Design",
    title: "Design Plans",
    description: "Creative visuals for brands, creators, and businesses.",
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
    description: "Professional edits built for modern content.",
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
    description: "Modern websites designed to grow your business.",
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
    description: "Digital strategies that help your brand reach more people.",
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
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
            Pricing
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Choose what you need.
            <br />
            <span className="text-white/35">
              Build what matters.
            </span>
          </h2>
        </div>

        {/* Plans */}
        <div className="grid gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <article
              key={plan.category}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20 md:p-9"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.3em] text-white/30">
                  0{index + 1}
                </span>

                <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                  {plan.category}
                </span>
              </div>

              <h3 className="mt-12 text-3xl font-medium tracking-tight md:text-4xl">
                {plan.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/40 md:text-base">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-8 space-y-3 border-t border-white/10 pt-7">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span className="text-white/30">+</span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                    Starting
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    {plan.price}
                  </p>
                </div>

                <a
                  href="#contact"
                  className="flex h-11 items-center rounded-full border border-white/15 px-5 text-sm text-white/70 transition group-hover:border-white group-hover:bg-white group-hover:text-black"
                >
                  Get Started ↗
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}