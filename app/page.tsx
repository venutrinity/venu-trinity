import Navbar from "./components/Navbar";
import SelectedWork from "./components/SelectedWork";
import Services from "./components/Services";
import About from "./components/About";
import Reveal from "./components/Reveal";
import CaseStudies from "./components/CaseStudies";
import DigitalProducts from "./components/DigitalProducts";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:py-32">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-white/40" />
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Creative Digital Studio
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-8xl lg:text-[110px]">
                We create
                <br />
                <span className="text-white/40">digital impact.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 max-w-2xl">
                <p className="text-base leading-7 text-white/50 md:text-lg md:leading-8">
                  Venu Trinity is a creative digital studio crafting powerful
                  visual identities, digital experiences, and creative
                  solutions for modern brands.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#work"
                  className="rounded-full bg-white px-7 py-4 text-center text-sm font-medium text-black transition hover:bg-white/80"
                >
                  View Our Work →
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-medium text-white transition hover:border-white/50"
                >
                  Start a Project
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/10 pt-8 md:grid-cols-4">
                <div>
                  <p className="text-2xl font-semibold">04+</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/40">
                    Services
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold">∞</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/40">
                    Ideas
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold">100%</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/40">
                    Creative
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold">01</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-white/40">
                    Vision
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Selected Work */}
        <Reveal>
          <SelectedWork />
        </Reveal>

        {/* Services */}
        <Reveal>
          <Services />
        </Reveal>

        {/* About */}
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <CaseStudies />
        </Reveal>
        <Reveal>
          <DigitalProducts />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
        <Footer />
      </main>
    </>
  );
}