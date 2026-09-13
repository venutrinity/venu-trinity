"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

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
  const router = useRouter();

  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkAdminAndLoad() {
      try {
        setLoading(true);
        setError("");

        // Check authentication first
        const authResponse = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        const authData = await authResponse.json();

        // Not logged in
        if (!authResponse.ok || !authData.user) {
          router.replace("/login");
          return;
        }

        // Logged in but not admin
        if (authData.user.role !== "admin") {
          router.replace("/dashboard");
          return;
        }

        // Admin confirmed — now load portfolio
        const response = await fetch("/api/portfolio", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load portfolio"
          );
        }

        if (mounted) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error(
          "Failed to load admin portfolio:",
          error
        );

        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to load portfolio projects."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAdminAndLoad();

    return () => {
      mounted = false;
    };
  }, [router]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [projects, activeCategory]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black text-white">
          <section className="px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
            <div className="mx-auto max-w-7xl">
              <div className="animate-pulse">
                <div className="h-3 w-24 rounded-full bg-white/10" />

                <div className="mt-6 h-20 w-80 rounded-xl bg-white/10 md:h-28 md:w-[520px]" />

                <div className="mt-5 h-5 w-full max-w-xl rounded-full bg-white/5" />
                <div className="mt-3 h-5 w-96 max-w-full rounded-full bg-white/5" />

                <div className="mt-12 h-px w-full bg-white/10" />

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="h-[320px] rounded-[1.75rem] bg-white/5" />
                  <div className="h-[320px] rounded-[1.75rem] bg-white/5" />
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}

        <section className="px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-white/30" />

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Portfolio Administration
                </p>
              </div>

              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[110px]">
                    Manage work.
                    <br />

                    <span className="text-white/25">
                      Build the archive.
                    </span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-sm leading-7 text-white/40 md:text-lg md:leading-8">
                    Manage your portfolio projects,
                    categories and published work from one
                    place.
                  </p>
                </div>

                <Link
                  href="/admin/portfolio/new"
                  className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
                >
                  <span>Add Project</span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}

        <section className="border-y border-white/10">
          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-5 md:px-10">
            {categories.map((category) => {
              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
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
            })}
          </div>
        </section>

        {/* Portfolio Grid */}

        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            {/* Error */}

            {error && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-8 py-10 text-center">
                  <p className="text-sm text-red-300">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      window.location.reload()
                    }
                    className="mt-5 rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/60 transition hover:bg-white hover:text-black"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Empty */}

            {!error &&
              filteredProjects.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg text-white/60">
                      No projects found.
                    </p>

                    <p className="mt-2 text-sm text-white/30">
                      Add a portfolio project to get
                      started.
                    </p>

                    <Link
                      href="/admin/portfolio/new"
                      className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-xs font-medium text-black transition hover:bg-white/90"
                    >
                      Add Project
                    </Link>
                  </div>
                </div>
              )}

            {/* Projects */}

            {!error &&
              filteredProjects.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  {filteredProjects.map(
                    (project, index) => {
                      const hasImage =
                        project.images &&
                        project.images.length > 0;

                      return (
                        <Link
                          key={project._id}
                          href={`/portfolio/${project.slug}`}
                          className="group block"
                        >
                          <motion.article
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
                              delay: index * 0.08,
                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            }}
                          >
                            {/* Visual */}

                            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080808]">
                              {hasImage ? (
                                <motion.img
                                  src={project.images[0]}
                                  alt={project.title}
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
                                  {/* Grid */}

                                  <div className="absolute inset-0 opacity-[0.045] transition-transform duration-1000 group-hover:scale-105">
                                    <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:55px_55px]" />
                                  </div>

                                  {/* Ambient Glow */}

                                  <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[90px] transition-all duration-700 group-hover:h-72 group-hover:w-72 group-hover:bg-white/[0.07]" />

                                  {/* Placeholder */}

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

                              {/* Overlay */}

                              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

                              {/* Number */}

                              <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em] text-white/50">
                                {String(index + 1).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              {/* Status */}

                              <span
                                className={`absolute right-6 top-6 rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] backdrop-blur-md ${
                                  project.status ===
                                  "published"
                                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                    : "border-white/10 bg-black/30 text-white/40"
                                }`}
                              >
                                {project.status ===
                                "published"
                                  ? "Published"
                                  : "Draft"}
                              </span>

                              {/* Arrow */}

                              <div className="absolute right-6 bottom-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/50 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                  ↗
                                </span>
                              </div>

                              {/* Bottom Gradient */}

                              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                              {/* Category */}

                              <div className="absolute bottom-6 left-6">
                                <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/50">
                                  {project.category}
                                </p>

                                <p className="text-xs text-white/30">
                                  Open project
                                </p>
                              </div>
                            </div>

                            {/* Content */}

                            <div className="px-1 pb-8 pt-6 md:pb-12">
                              <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-[-0.025em] text-white/90 md:text-3xl">
                                {project.title}
                              </h2>

                              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/35">
                                {project.description}
                              </p>
                            </div>
                          </motion.article>
                        </Link>
                      );
                    }
                  )}
                </div>
              )}
          </div>
        </section>

        {/* Bottom CTA */}

        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Portfolio management
            </p>

            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
                Your work.
                <br />

                <span className="text-white/25">
                  Your story.
                </span>
              </h2>

              <Link
                href="/admin/portfolio/new"
                className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                Add a project

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