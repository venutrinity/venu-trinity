"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";

type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  client?: string;
  tools: string[];
  images: string[];
  status: "draft" | "published";
};

export default function WebDevelopmentPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/portfolio");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load projects"
          );
        }

        const webProjects = (data.projects || []).filter(
          (project: PortfolioProject) =>
            project.category === "Web Development"
        );

        setProjects(webProjects);
      } catch (error) {
        console.error(
          "Failed to load web development projects:",
          error
        );

        setError(
          "Unable to load web development projects."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Portfolio / Web Development
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Digital experiences
                <br />
                <span className="text-white/35">
                  built to perform.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Fast, responsive, modern websites and digital
                experiences designed for businesses, creators,
                and ambitious brands.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Projects */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            {loading && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-white/20 border-t-white" />

                  <p className="mt-5 text-sm text-white/40">
                    Loading projects...
                  </p>
                </div>
              </div>
            )}

            {!loading && error && (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-white/40">
                  {error}
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              projects.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg text-white/60">
                      No web development projects yet.
                    </p>

                    <p className="mt-2 text-sm text-white/30">
                      Published projects will appear here.
                    </p>
                  </div>
                </div>
              )}

            {!loading &&
              !error &&
              projects.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {projects.map((project, index) => {
                    const hasImage =
                      project.images &&
                      project.images.length > 0;

                    return (
                      <Reveal
                        key={project._id}
                        delay={index * 0.08}
                      >
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                        >
                          {/* Project Preview */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
                            {hasImage ? (
                              <img
                                src={project.images[0]}
                                alt={project.title}
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <>
                                <div className="absolute inset-0 opacity-20">
                                  <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                                </div>

                                <div className="absolute inset-x-8 top-8 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl transition duration-500 group-hover:scale-[1.03]">
                                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                                    <span className="h-2 w-2 rounded-full bg-white/20" />
                                    <span className="h-2 w-2 rounded-full bg-white/20" />
                                    <span className="h-2 w-2 rounded-full bg-white/20" />
                                  </div>

                                  <div className="flex h-40 items-center justify-center">
                                    <span className="text-4xl font-semibold tracking-[-0.08em] text-white/15">
                                      VT
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/20" />

                            {/* Number */}
                            <span className="absolute bottom-5 left-5 text-xs tracking-[0.25em] text-white/40">
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            {/* Arrow */}
                            <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                              ↗
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 md:p-8">
                            <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                              {project.category}
                            </p>

                            <div className="mt-4">
                              <h2 className="text-2xl font-medium tracking-tight">
                                {project.title}
                              </h2>

                              <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
                Need a website?
                <br />
                <span className="text-white/35">
                  Let&apos;s build it.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href="/#contact"
                className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/85"
              >
                Start a Project →
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}