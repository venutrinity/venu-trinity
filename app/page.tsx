import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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

      <main className="min-h-screen overflow-hidden bg-black text-white">
        {/* Hero */}
        <Hero />

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