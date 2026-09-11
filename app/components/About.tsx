import Reveal from "./Reveal";
export default function About() {
  return (
<Reveal>
    <section
      id="about"
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

          {/* Left */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              About Venu Trinity
            </p>

            <div className="mt-8 text-7xl font-semibold tracking-[-0.06em] text-white/10 md:text-9xl">
              VT
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-6xl">
              We turn creative ideas into
              <span className="text-white/35">
                {" "}digital experiences.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg">
              Venu Trinity is a creative digital studio focused on design,
              technology, and digital growth. We combine creativity with
              practical digital solutions to help brands communicate,
              connect, and grow.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/50 md:text-lg">
              From a single visual to a complete digital presence, our goal
              is simple — create work that looks exceptional and delivers
              real value.
            </p>

            {/* Values */}
            <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium">01</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/35">
                  Creativity
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">02</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/35">
                  Technology
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">03</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/35">
                  Impact
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
</Reveal>
  );
}