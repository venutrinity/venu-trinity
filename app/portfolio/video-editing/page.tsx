import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";
import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "YouTube Video Editing",
    description:
      "Long-form YouTube videos with clean pacing, storytelling, transitions, sound design, and engaging visuals.",
    category: "YouTube",
  },
  {
    number: "02",
    title: "Reels & Shorts",
    description:
      "Fast-paced vertical content designed for Instagram Reels, YouTube Shorts, and social media audiences.",
    category: "Short Form",
  },
  {
    number: "03",
    title: "Motion Graphics",
    description:
      "Animated typography, transitions, visual effects, and motion elements that make content more dynamic.",
    category: "Motion Design",
  },
  {
    number: "04",
    title: "Content Editing",
    description:
      "Creative editing solutions for creators, brands, businesses, and digital campaigns.",
    category: "Content",
  },
];

export default function VideoEditingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Portfolio / Video Editing
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Stories that
                <br />
                <span className="text-white/35">move people.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Video editing designed to turn raw footage into engaging,
                polished, and memorable digital content.
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
                    {/* Temporary video preview */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:bg-white/15">
                          <span className="ml-1 text-xl">▶</span>
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
                Have a story to tell?
                <br />
                <span className="text-white/35">
                  Let&apos;s bring it to life.
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