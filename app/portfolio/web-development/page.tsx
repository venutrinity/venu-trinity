import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";
import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Business Website",
    description:
      "Modern, responsive websites designed to give businesses a strong and professional digital presence.",
    category: "Business Website",
  },
  {
    number: "02",
    title: "Portfolio Website",
    description:
      "Personal and creative portfolio experiences designed to showcase work, skills, and personal brands.",
    category: "Portfolio",
  },
  {
    number: "03",
    title: "Web Application",
    description:
      "Functional web applications built with modern technologies and thoughtful user experiences.",
    category: "Web App",
  },
  {
    number: "04",
    title: "Landing Page",
    description:
      "Conversion-focused landing pages created for products, services, campaigns, and digital businesses.",
    category: "Landing Page",
  },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Portfolio / Web Development
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Digital experiences
                <br />
                <span className="text-white/35">built to perform.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Fast, responsive, modern websites and digital experiences
                designed for businesses, creators, and ambitious brands.
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
                    {/* Temporary website preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      </div>

                      <div className="absolute inset-x-8 top-8 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl transition duration-500 group-hover:scale-[1.03]">
                        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                          <span className="h-2 w-2 rounded-full bg-white/20" />
                          <span className="h-2 w-2 rounded-full bg-white/20" />
                          <span className="h-2 w-2 rounded-full bg-white/20" />
                        </div>

                        <div className="flex h-40 items-center justify-center">
                          <span className="text-4xl font-semibold tracking-[-0.08em] text-white/15">
                            VT
                          </span>
                        </div>
                      </div>

                      <span className="absolute bottom-5 left-5 text-xs tracking-[0.25em] text-white/30">
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
                Need a website?
                <br />
                <span className="text-white/35">
                  Let&apos;s build it.
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