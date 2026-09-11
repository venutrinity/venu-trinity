import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                About Venu Trinity
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Creativity meets
                <br />
                <span className="text-white/35">
                  technology.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Venu Trinity is a creative digital studio focused on design,
                technology, and digital growth. We build visual identities,
                digital experiences, and creative solutions for modern brands.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="border-y border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Our Approach
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                  We believe great digital work should look beautiful,
                  feel simple, and create real impact.
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-white/40">
                  Our approach combines creative thinking, thoughtful design,
                  and modern technology. Whether it is a brand identity,
                  campaign, website, or digital product, every project starts
                  with understanding the problem and ends with creating
                  something meaningful.
                </p>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/40">
                  We are building Venu Trinity as more than a creative studio.
                  It is a digital ecosystem for brands, creators, and
                  businesses to design, build, learn, and grow.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-12 text-xs uppercase tracking-[0.3em] text-white/30">
                What We Value
              </p>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                ["01", "Creativity", "Ideas that stand apart."],
                ["02", "Technology", "Modern tools, thoughtful solutions."],
                ["03", "Impact", "Work that creates real value."],
              ].map(([number, title, description], index) => (
                <Reveal key={number} delay={index * 0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
                    <span className="text-xs tracking-[0.3em] text-white/30">
                      {number}
                    </span>

                    <h3 className="mt-16 text-2xl font-medium">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/40">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}