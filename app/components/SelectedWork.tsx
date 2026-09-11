const projects = [
  {
    number: "01",
    title: "Brand Identity",
    category: "Graphic Design",
    style: "from-white/10 via-white/[0.02] to-transparent",
  },
  {
    number: "02",
    title: "Digital Experience",
    category: "Web Development",
    style: "from-white/[0.08] via-white/[0.02] to-transparent",
  },
  {
    number: "03",
    title: "Visual Campaign",
    category: "Creative Design",
    style: "from-white/[0.06] via-white/[0.02] to-transparent",
  },
];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
              Selected Work
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Ideas turned into
              <br />
              <span className="text-white/35">
                visual experiences.
              </span>
            </h2>
          </div>

          <a
            href="/portfolio"
            className="shrink-0 text-sm text-white/50 transition hover:text-white"
          >
            View all work <span className="ml-2">↗</span>
          </a>
        </div>

        {/* Projects */}
        <div className="grid gap-5 md:grid-cols-2">

          {projects.map((project, index) => (
            <article
              key={project.number}
              className={`group ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.style} ${
                  index === 0
                    ? "aspect-[2/1]"
                    : "aspect-[4/3]"
                }`}
              >

                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>

                {/* Glow */}
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl transition duration-700 group-hover:scale-[2]" />

                {/* Number */}
                <div className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/30 md:left-8 md:top-8">
                  {project.number}
                </div>

                {/* Center Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-28 w-28 rotate-12 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] transition duration-700 group-hover:rotate-0 group-hover:scale-125">
                    <span className="text-3xl font-semibold text-white/20">
                      VT
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {project.category}
                    </p>

                    <h3 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg transition duration-300 group-hover:bg-white group-hover:text-black">
                    ↗
                  </div>
                </div>

              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}