import Navbar from "../components/Navbar";

export default function Portfolio() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">

          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
            Portfolio
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
            Selected work.
            <br />
            <span className="text-white/35">
              Built with purpose.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/45 md:text-lg md:leading-8">
            Explore our work across graphic design, video editing,
            web development, and branding.
          </p>

          <div className="mt-20 grid gap-5 md:grid-cols-2">
            {[
              ["01", "Graphic Design"],
              ["02", "Video Editing"],
              ["03", "Web Development"],
              ["04", "Branding"],
            ].map(([number, title]) => (
              <div
                key={number}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

                <span className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/30">
                  {number}
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-semibold text-white/10 transition duration-500 group-hover:scale-110 group-hover:text-white/20">
                    VT
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <h2 className="text-2xl font-medium">{title}</h2>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition group-hover:bg-white group-hover:text-black">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}