import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import Link from "next/link";

const plans = [
  {
    number: "01",
    title: "Design Plans",
    description:
      "Creative design solutions for brands, creators, and businesses.",
    price: "From ₹999",
    features: [
      "Social Media Designs",
      "YouTube Thumbnails",
      "Posters & Creatives",
      "Branding",
    ],
  },
  {
    number: "02",
    title: "Video Plans",
    description:
      "Professional editing packages for creators and digital brands.",
    price: "From ₹1,499",
    features: [
      "YouTube Videos",
      "Reels & Shorts",
      "Motion Graphics",
      "Content Editing",
    ],
  },
  {
    number: "03",
    title: "Website Plans",
    description:
      "Modern websites built for businesses, creators, and personal brands.",
    price: "From ₹4,999",
    features: [
      "Responsive Website",
      "Modern UI / UX",
      "SEO Basics",
      "Deployment",
    ],
  },
  {
    number: "04",
    title: "Marketing Plans",
    description:
      "Digital marketing services focused on reach, leads, and growth.",
    price: "From ₹2,999",
    features: [
      "Social Media Strategy",
      "Meta Ads",
      "SEO",
      "Lead Generation",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Pricing
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Simple plans.
                <br />
                <span className="text-white/35">
                  Serious results.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Flexible creative and digital services designed around your
                project, goals, and budget.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2">
              {plans.map((plan, index) => (
                <Reveal key={plan.number} delay={index * 0.08}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:border-white/20 hover:bg-white/[0.05] md:p-10">
                    <div className="flex items-start justify-between">
                      <span className="text-xs tracking-[0.3em] text-white/30">
                        {plan.number}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                        Flexible
                      </span>
                    </div>

                    <h2 className="mt-16 text-3xl font-medium tracking-tight md:text-4xl">
                      {plan.title}
                    </h2>

                    <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                      {plan.description}
                    </p>

                    <div className="mt-8">
                      <span className="text-2xl font-medium">
                        {plan.price}
                      </span>
                    </div>

                    <div className="my-8 h-px bg-white/10" />

                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-white/50"
                        >
                          <span className="text-white/30">+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/#contact"
                      className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                    >
                      Get Started →
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Quote */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 md:px-12 md:py-24">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Custom Projects
                </p>

                <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
                  Need something
                  <br />
                  <span className="text-white/35">
                    completely custom?
                  </span>
                </h2>

                <p className="mt-7 max-w-2xl text-base leading-8 text-white/40">
                  Every project is different. Tell us what you are building
                  and we&apos;ll create a solution around your requirements.
                </p>

                <Link
                  href="/#contact"
                  className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                >
                  Request a Quote →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}