export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* CTA */}
        <div className="border-b border-white/10 pb-20">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            Start a Project
          </p>

          <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
            Have an idea?
            <br />
            <span className="text-white/35">Let's create it.</span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/40 md:text-lg">
            Tell us what you're building, what you need, and where you want
            to go. Let's turn your idea into something meaningful.
          </p>
        </div>

        {/* Contact Form */}
        <div className="grid gap-16 pt-16 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Left */}
          <div>
            <p className="text-sm text-white/40">
              Tell us about your project.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/50">
              <p>Graphic Design</p>
              <p>Video Editing</p>
              <p>Web Development</p>
              <p>Digital Marketing</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-8">

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full border-b border-white/15 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/50"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full border-b border-white/15 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/30">
                Service
              </label>

              <select
                className="mt-3 w-full border-b border-white/15 bg-black pb-4 text-sm text-white/60 outline-none focus:border-white/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="graphic-design">Graphic Design</option>
                <option value="video-editing">Video Editing</option>
                <option value="web-development">Web Development</option>
                <option value="digital-marketing">
                  Digital Marketing
                </option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-white/30">
                Project Details
              </label>

              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="mt-3 w-full resize-none border-b border-white/15 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/50"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/80"
            >
              Send Enquiry →
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}