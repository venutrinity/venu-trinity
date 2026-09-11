import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import Link from "next/link";

const caseStudies = [
  {
    number: "01",
    category: "Branding",
    title: "Building a Strong Visual Identity",
    description:
      "A complete branding direction focused on creating a memorable identity and a consistent visual system.",
    focus: ["Brand Strategy", "Logo Design", "Visual Identity"],
  },
  {
    number: "02",
    category: "Web Development",
    title: "Creating a Premium Digital Experience",
    description:
      "A modern website experience designed around strong visuals, clear content, responsive layouts, and smooth interactions.",
    focus: ["UX / UI", "Development", "Responsive Design"],
  },
  {
    number: "03",
    category: "Digital Marketing",
    title: "Turning Content Into Growth",
    description:
      "A digital marketing approach combining creative content, social media, advertising, and lead generation.",
    focus: ["Content Strategy", "Social Media", "Lead Generation"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Case Studies
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Behind the
                <br />
                <span className="text-white/35">creative work.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Explore the thinking, design decisions, and digital solutions
                behind selected Venu Trinity projects.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Case Studies */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-6">
              {caseStudies.map((study, index) => (
                <Reveal key={study.number} delay={index * 0.08}>
                  <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-500 hover:border-white/20">
                    <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                      {/* Visual */}
                      <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent lg:min-h-[420px]">
                        <div className="absolute inset-0 opacity-20">
                          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center transition duration-700 group-hover:scale-110">
                            <span className="text-7xl font-semibold tracking-[-0.08em] text-white/15 md:text-9xl">
                              VT
                            </span>

                            <p className="mt-3 text-[9px] uppercase tracking-[0.45em] text-white/15">
                              Case Study {study.number}
                            </p>
                          </div>
                        </div>

                        <span className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/30">
                          {study.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between p-7 md:p-10 lg:p-14">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                            {study.category}
                          </p>

                          <h2 className="mt-5 max-w-xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                            {study.title}
                          </h2>

                          <p className="mt-6 max-w-xl text-sm leading-7 text-white/40 md:text-base">
                            {study.description}
                          </p>
                        </div>

                        <div className="mt-12">
                          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/25">
                            Focus
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {study.focus.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/45"
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            className="mt-8 inline-flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
                          >
                            View Case Study
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              ↗
                            </span>
                          </button>
                        </div>
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
                Have a project
                <br />
                <span className="text-white/35">
                  worth building?
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