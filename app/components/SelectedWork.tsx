"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
};

export default function SelectedWork() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/portfolio");

        if (!response.ok) {
          throw new Error("Failed to load portfolio");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.projects)) {
          const visualProjects = data.projects
            .filter(
              (project: PortfolioProject) =>
                project.images &&
                project.images.length > 0
            )
            .slice(0, 3);

          setProjects(visualProjects);
        }
      } catch (error) {
        console.error(
          "Selected work loading failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section
      id="work"
      className="bg-black px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Selected Work
              </p>
            </div>

            <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
              Ideas turned into
              <br />
              <span className="text-white/30">
                visual experiences.
              </span>
            </h2>
          </div>

          <a
            href="/portfolio"
            className="group flex w-fit items-center gap-3 border-b border-white/20 pb-2 text-sm text-white/60 transition-colors duration-300 hover:border-white/60 hover:text-white"
          >
            View all work

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="aspect-[16/10] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.025] md:col-span-2" />

            <div className="aspect-[16/10] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.025]" />

            <div className="aspect-[16/10] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.025]" />
          </div>
        )}

        {/* No projects */}
        {!loading && projects.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-12 text-center">
            <p className="text-sm text-white/40">
              Selected work coming soon.
            </p>
          </div>
        )}

        {/* Projects */}
        {!loading && projects.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => {
              const isFeatured = index === 0;

              return (
                <motion.a
                  key={project._id}
                  href={`/portfolio/${project.slug}`}
                  initial={{
                    opacity: 0,
                    y: 40,
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
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] ${
                    isFeatured ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden bg-[#090909] ${
                      isFeatured
                        ? "aspect-[16/9]"
                        : "aspect-[16/10]"
                    }`}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/5" />

                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top information */}
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between md:left-7 md:right-7 md:top-7">
                      <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] text-white/65 backdrop-blur-md">
                        {isFeatured
                          ? "Featured Work"
                          : `0${index + 1}`}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/20 text-sm text-white/60 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                        ↗
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-white/50">
                        {project.category}
                      </p>

                      <h3
                        className={`mt-2 max-w-3xl font-medium leading-tight tracking-[-0.04em] text-white ${
                          isFeatured
                            ? "text-2xl sm:text-4xl md:text-5xl"
                            : "text-xl md:text-2xl"
                        }`}
                      >
                        {project.title}
                      </h3>

                      {isFeatured && (
                        <p className="mt-3 hidden max-w-xl text-sm leading-6 text-white/50 sm:block">
                          {project.description}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.25em] text-white/45">
                        View project
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}