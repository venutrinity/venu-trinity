import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Graphic Design",
    description:
      "Brand identities, social media creatives, thumbnails, posters, and visual systems.",
    items: ["Branding", "Social Media", "YouTube Thumbnails", "Posters"],
  },
  {
    number: "02",
    title: "Video Editing",
    description:
      "High-quality video content designed to keep your audience engaged.",
    items: ["YouTube", "Reels & Shorts", "Motion Graphics", "Content Editing"],
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Fast, responsive, modern websites and digital experiences for businesses.",
    items: ["Business Websites", "Portfolio Websites", "Web Apps", "Deployment"],
  },
  {
    number: "04",
    title: "Digital Marketing",
    description:
      "Strategies that help brands reach the right audience and generate growth.",
    items: ["Social Media", "Meta Ads", "SEO", "Lead Generation"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Our Services
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Everything you need
                <br />
                <span className="text-white/35">
                  to build your digital presence.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/45 md:text-lg md:leading-8">
                From visual identity to websites and digital marketing,
                Venu Trinity brings creative and digital services together
                under one roof.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-7xl border-t border-white/10">
            {services.map((service) => (
              <Reveal key={service.number}>
                <article className="group grid gap-8 border-b border-white/10 py-10 md:grid-cols-[80px_1fr_1fr] md:py-14">
                  <span className="text-xs tracking-[0.3em] text-white/30">
                    {service.number}
                  </span>

                  <div>
                    <h2 className="text-3xl font-medium tracking-tight transition duration-300 group-hover:translate-x-2 md:text-5xl">
                      {service.title}
                    </h2>

                    <p className="mt-5 max-w-md text-sm leading-6 text-white/40 md:text-base">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 self-end text-sm text-white/40">
                    {service.items.map((item) => (
                      <span key={item}>+ {item}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center md:px-10 md:py-24">
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Have a project?
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Let&apos;s build something
                <span className="text-white/35"> great.</span>
              </h2>

              <Link
                href="/#contact"
                className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/80"
              >
                Start a Project →
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}