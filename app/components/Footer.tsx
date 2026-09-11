export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">
              Venu Trinity
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
              Creative design, digital experiences, and growth solutions for
              modern brands.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/30">
              Explore
            </p>

            <div className="space-y-3 text-sm text-white/50">
              <a href="#" className="block transition hover:text-white">
                Home
              </a>
              <a href="#about" className="block transition hover:text-white">
                About
              </a>
              <a href="#work" className="block transition hover:text-white">
                Portfolio
              </a>
              <a href="#services" className="block transition hover:text-white">
                Services
              </a>
              <a href="#contact" className="block transition hover:text-white">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/30">
              Services
            </p>

            <div className="space-y-3 text-sm text-white/50">
              <p>Graphic Design</p>
              <p>Video Editing</p>
              <p>Web Development</p>
              <p>Digital Marketing</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/30">
              Connect
            </p>

            <div className="space-y-3 text-sm text-white/50">
              <a href="#" className="block transition hover:text-white">
                Instagram ↗
              </a>
              <a href="#" className="block transition hover:text-white">
                YouTube ↗
              </a>
              <a href="#" className="block transition hover:text-white">
                LinkedIn ↗
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Venu Trinity. All rights reserved.</p>

          <p>Design • Digital • Growth</p>
        </div>

      </div>
    </footer>
  );
}