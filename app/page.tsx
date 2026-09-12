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
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[100px] md:h-[600px] md:w-[600px]" />

            <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-white/[0.015] blur-[90px]" />

            <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-white/[0.02] blur-[100px]" />
          </div>

          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40 lg:pb-32 lg:pt-44">
            {/* Eyebrow */}
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white/70" />
                </span>

                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Creative Digital Studio
                </p>
              </div>
            </Reveal>

            {/* Main Heading */}
            <Reveal delay={0.1}>
              <h1 className="max-w-6xl text-[15vw] font-semibold leading-[0.82] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[112px]">
                We create
                <br />
                <span className="text-white/25">digital impact.</span>
              </h1>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#work"
                  className="group rounded-full bg-white px-7 py-4 text-center text-sm font-medium text-black transition duration-300 hover:bg-white/85"
                >
                  View Our Work
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-white/15 bg-white/[0.02] px-7 py-4 text-center text-sm font-medium text-white transition duration-300 hover:border-white/40 hover:bg-white/[0.05]"
                >
                  Start a Project
                </a>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.4}>
              <div className="mt-20 grid max-w-4xl grid-cols-2 gap-y-8 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-8">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    04+
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Services
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    ∞
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Ideas
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    100%
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Creative
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    01
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Vision
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Scroll indicator */}
            <Reveal delay={0.5}>
              <div className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
                <span className="h-10 w-px bg-white/20" />
                Scroll to explore
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

        {/* Case Studies */}
        <Reveal>
          <CaseStudies />
        </Reveal>

        {/* Digital Products */}
        <Reveal>
          <DigitalProducts />
        </Reveal>

        {/* Pricing */}
        <Reveal>
          <Pricing />
        </Reveal>

        {/* Contact */}
        <Reveal>
          <Contact />
        </Reveal>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}