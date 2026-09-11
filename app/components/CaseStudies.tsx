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
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
            Case Studies
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Creative work with
            <br />
            <span className="text-white/35">purpose and impact.</span>
          </h2>
        </div>

        {/* Case Studies */}
        <div className="space-y-5">
          {caseStudies.map((study) => (
            <article
              key={study.number}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-500 hover:border-white/20"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative grid gap-8 p-7 md:grid-cols-[80px_1fr_220px_40px] md:items-center md:p-10">

                {/* Number */}
                <span className="text-xs tracking-[0.3em] text-white/30">
                  {study.number}
                </span>

                {/* Main Content */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {study.category}
                  </p>

                  <h3 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight md:text-4xl">
                    {study.title}
                  </h3>
                </div>

                {/* Result */}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                    Focus
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    {study.result}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  ↗
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}