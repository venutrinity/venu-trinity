"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category:
    | "Graphic Design"
    | "Video Editing"
    | "Web Development"
    | "Digital Marketing"
    | "Branding";
  description: string;
  client?: string;
  tools: string[];
  images: string[];
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

const categories = [
  "All",
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Digital Marketing",
  "Branding",
];

export default function Portfolio() {
  const [projects, setProjects] =
    useState<PortfolioProject[]>([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/portfolio"
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load portfolio"
          );
        }

        setProjects(
          data.projects || []
        );
      } catch (error) {
        console.error(
          "Failed to load portfolio:",
          error
        );

        setError(
          "Unable to load portfolio projects."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects =
    useMemo(() => {
      if (activeCategory === "All") {
        return projects;
      }

      return projects.filter(
        (project) =>
          project.category ===
          activeCategory
      );
    }, [
      projects,
      activeCategory,
    ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">

        {/* HEADER */}

        <section className="px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">

          <div className="mx-auto max-w-7xl">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-8 bg-white/30" />

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Portfolio
                </p>

              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[110px]">
                Selected work.
                <br />

                <span className="text-white/25">
                  Built with purpose.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/40 md:text-lg md:leading-8">
                A collection of visual
                identities, digital
                experiences, creative
                campaigns and stories
                created by Venu Trinity.
              </p>

            </motion.div>

          </div>

        </section>

        {/* CATEGORY FILTER */}

        <section className="border-y border-white/10">

          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-5 md:px-10">

            {categories.map(
              (category) => {
                const isActive =
                  activeCategory ===
                  category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`whitespace-nowrap text-xs transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/35 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* PORTFOLIO GRID */}

        <section className="px-6 py-16 md:px-10 md:py-24">

          <div className="mx-auto max-w-7xl">

            {/* LOADING */}

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

            {/* ERROR */}

            {!loading && error && (
              <div className="flex min-h-[300px] items-center justify-center">

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 text-center">

                  <p className="text-sm text-white/50">
                    {error}
                  </p>

                </div>

              </div>
            )}

            {/* EMPTY */}

            {!loading &&
              !error &&
              filteredProjects.length ===
                0 && (
                <div className="flex min-h-[300px] items-center justify-center">

                  <div className="text-center">

                    <p className="text-lg text-white/60">
                      No projects found.
                    </p>

                    <p className="mt-2 text-sm text-white/30">
                      More work will be
                      added soon.
                    </p>

                  </div>

                </div>
              )}

            {/* PROJECTS */}

            {!loading &&
              !error &&
              filteredProjects.length >
                0 && (
                <div className="grid gap-5 md:grid-cols-2">

                  {filteredProjects.map(
                    (
                      project,
                      index
                    ) => {
                      const hasImage =
                        project.images &&
                        project.images.length >
                          0;

                      return (
                        <motion.div
                          key={project._id}
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.15,
                          }}
                          transition={{
                            duration: 0.8,
                            delay:
                              index * 0.08,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          className="group"
                        >

                          {/* ENTIRE PROJECT CARD CLICKABLE */}

                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="block cursor-pointer"
                          >

                            {/* VISUAL */}

                            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080808]">

                              {hasImage ? (
                                <motion.img
                                  src={
                                    project
                                      .images[0]
                                  }
                                  alt={
                                    project.title
                                  }
                                  className="absolute inset-0 h-full w-full object-cover"
                                  whileHover={{
                                    scale: 1.05,
                                  }}
                                  transition={{
                                    duration: 0.7,
                                    ease: [
                                      0.22,
                                      1,
                                      0.36,
                                      1,
                                    ],
                                  }}
                                />
                              ) : (
                                <>

                                  {/* GRID */}

                                  <div className="absolute inset-0 opacity-[0.045] transition-transform duration-1000 group-hover:scale-105">

                                    <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:55px_55px]" />

                                  </div>

                                  {/* AMBIENT GLOW */}

                                  <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[90px] transition-all duration-700 group-hover:h-72 group-hover:w-72 group-hover:bg-white/[0.07]" />

                                  {/* PLACEHOLDER */}

                                  <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    whileHover={{
                                      scale: 1.04,
                                    }}
                                    transition={{
                                      duration: 0.7,
                                      ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                      ],
                                    }}
                                  >

                                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-md md:h-44 md:w-44">

                                      <div className="absolute inset-3 rounded-full border border-white/[0.06]" />

                                      <span className="text-4xl font-semibold tracking-[-0.08em] text-white/15 transition-colors duration-500 group-hover:text-white/30 md:text-5xl">
                                        VT
                                      </span>

                                    </div>

                                  </motion.div>

                                </>
                              )}

                              {/* IMAGE OVERLAY */}

                              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

                              {/* PROJECT NUMBER */}

                              <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em] text-white/50">
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              {/* ARROW */}

                              <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">

                                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                  ↗
                                </span>

                              </div>

                              {/* BOTTOM GRADIENT */}

                              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                              {/* CATEGORY */}

                              <div className="absolute bottom-6 left-6">

                                <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/50">
                                  {
                                    project.category
                                  }
                                </p>

                                <p className="text-xs text-white/30 transition-colors duration-300 group-hover:text-white/60">
                                  Explore project
                                </p>

                              </div>

                            </div>

                            {/* CONTENT */}

                            <div className="px-1 pb-8 pt-6 md:pb-12">

                              <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-[-0.025em] text-white/90 transition-colors duration-300 group-hover:text-white md:text-3xl">
                                {
                                  project.title
                                }
                              </h2>

                              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/35">
                                {
                                  project.description
                                }
                              </p>

                            </div>

                          </Link>

                        </motion.div>
                      );
                    }
                  )}

                </div>
              )}

          </div>

        </section>

        {/* BOTTOM CTA */}

        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">

          <div className="mx-auto max-w-7xl">

            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Have a project in mind?
            </p>

            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

              <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
                Let&apos;s create something

                <span className="text-white/25">
                  {" "}
                  worth remembering.
                </span>
              </h2>

              <Link
                href="/contact"
                className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                Start a project

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}