import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";
import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Complete visual identities built around a clear brand direction, personality, and memorable visual language.",
    category: "Identity",
  },
  {
    number: "02",
    title: "Logo Design",
    description:
      "Distinctive logo concepts designed to create a strong and recognizable brand presence.",
    category: "Logo Design",
  },
  {
    number: "03",
    title: "Brand Guidelines",
    description:
      "Structured brand systems covering typography, colors, layouts, and visual consistency.",
    category: "Brand System",
  },
  {
    number: "04",
    title: "Marketing Collateral",
    description:
      "Business cards, brochures, social creatives, packaging, and promotional materials.",
    category: "Collateral",
  },
];

export default function BrandingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Portfolio / Branding
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Brands with
                <br />
                <span className="text-white/35">a clear identity.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Building memorable brands through strategy, identity,
                typography, visual systems, and consistent design.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Projects */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <Reveal key={project.number} delay={index * 0.08}>
                  <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    {/* Temporary branding preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center transition duration-500 group-hover:scale-110">
                          <div className="text-5xl font-semibold tracking-[-0.08em] text-white/20 md:text-7xl">
                            VT
                          </div>

                          <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-white/15">
                            Venu Trinity
                          </div>
                        </div>
                      </div>

                      <span className="absolute left-5 top-5 text-xs tracking-[0.25em] text-white/30">
                        {project.number}
                      </span>
                    </div>

                    <div className="p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                        {project.category}
                      </p>

                      <div className="mt-4 flex items-start justify-between gap-5">
                        <div>
                          <h2 className="text-2xl font-medium tracking-tight">
                            {project.title}
                          </h2>

                          <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                            {project.description}
                          </p>
                        </div>

                        <span className="text-xl text-white/40 transition-transform duration-300 group-hover:translate-x-1">
                          ↗
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
                Building a brand?
                <br />
                <span className="text-white/35">
                  Let&apos;s make it memorable.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href="/#contact"
                className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/85"
              >
                Start a Project →
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}