import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";

const services = [
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Digital Marketing",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Contact
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Let&apos;s create
                <br />
                <span className="text-white/35">
                  something meaningful.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Tell us about your idea, project, or business. We&apos;ll
                explore how design, technology, and digital strategy can bring
                it to life.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Area */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            {/* Left */}
            <Reveal>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Start a conversation
                </p>

                <h2 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
                  Have a project in mind?
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
                  Share a few details about what you&apos;re looking to build.
                  We&apos;ll get back to you with the next steps.
                </p>

                <div className="mt-10">
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/25">
                    Services
                  </p>

                  <div className="space-y-3">
                    {services.map((service) => (
                      <p
                        key={service}
                        className="text-sm text-white/50"
                      >
                        + {service}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <form className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs uppercase tracking-[0.2em] text-white/30"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="mt-3 w-full border-b border-white/15 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-[0.2em] text-white/30"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="mt-3 w-full border-b border-white/15 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="text-xs uppercase tracking-[0.2em] text-white/30"
                  >
                    Service
                  </label>

                  <select
                    id="service"
                    defaultValue=""
                    className="mt-3 w-full border-b border-white/15 bg-black pb-4 text-sm text-white/60 outline-none focus:border-white/50"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="text-xs uppercase tracking-[0.2em] text-white/30"
                  >
                    Budget
                  </label>

                  <select
                    id="budget"
                    defaultValue=""
                    className="mt-3 w-full border-b border-white/15 bg-black pb-4 text-sm text-white/60 outline-none focus:border-white/50"
                  >
                    <option value="" disabled>
                      Select your budget
                    </option>
                    <option value="under-5k">Under ₹5,000</option>
                    <option value="5k-15k">₹5,000 – ₹15,000</option>
                    <option value="15k-50k">₹15,000 – ₹50,000</option>
                    <option value="50k-plus">₹50,000+</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="text-xs uppercase tracking-[0.2em] text-white/30"
                  >
                    Project Details
                  </label>

                  <textarea
                    id="details"
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="mt-3 w-full resize-none border-b border-white/15 bg-transparent pb-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:bg-white/80"
                >
                  Send Enquiry →
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Venu Trinity
              </p>

              <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
                Good ideas deserve
                <br />
                <span className="text-white/35">
                  great execution.
                </span>
              </h2>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}