import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";
import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "YouTube Thumbnail Design",
    description:
      "High-impact thumbnail concepts designed to improve visual attention and click potential.",
    category: "Thumbnail Design",
  },
  {
    number: "02",
    title: "Social Media Campaign",
    description:
      "Clean and engaging social media creatives built for modern digital brands.",
    category: "Social Media",
  },
  {
    number: "03",
    title: "Brand Poster",
    description:
      "Premium poster compositions combining typography, imagery, and strong visual hierarchy.",
    category: "Poster Design",
  },
  {
    number: "04",
    title: "Product Creative",
    description:
      "Product-focused visuals created for campaigns, promotions, and digital advertising.",
    category: "Creative Design",
  },
];

export default function GraphicDesignPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Portfolio / Graphic Design
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Visuals that
                <br />
                <span className="text-white/35">make an impact.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                A selection of graphic design work created for creators,
                businesses, brands, and digital campaigns.
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
                    {/* Temporary portfolio preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-semibold tracking-[-0.08em] text-white/20 transition duration-500 group-hover:scale-110 group-hover:text-white/30 md:text-7xl">
                          VT
                        </span>
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
                Have a visual idea?
                <br />
                <span className="text-white/35">
                  Let&apos;s create it.
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