"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const artworkY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const artworkRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const artworkScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.78],
    [1, 0]
  );

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
                project.images && project.images.length > 0
            )
            .slice(0, 5);

          setProjects(visualProjects);
        }
      } catch (error) {
        console.error("Hero portfolio loading failed:", error);
      }
    }

    loadProjects();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden border-b border-white/[0.08] bg-[#050505] text-white"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[55%] top-[32%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/[0.055] blur-[170px] sm:h-[650px] sm:w-[650px]" />

        <div className="absolute -right-[180px] top-[10%] h-[420px] w-[420px] rounded-full bg-violet-500/[0.04] blur-[160px]" />

        <div className="absolute -left-[180px] bottom-[-15%] h-[420px] w-[420px] rounded-full bg-blue-500/[0.03] blur-[160px]" />

        <div className="absolute inset-0 opacity-[0.035]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:80px_80px] sm:bg-[size:100px_100px]" />
        </div>

        <div className="absolute bottom-[-2vw] left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[20vw] font-semibold leading-none tracking-[-0.1em] text-white/[0.018] lg:block">
          TRINITY
        </div>
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 pb-7 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
        {/* =====================================================
            TOP BAR
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="flex items-center justify-between border-b border-white/[0.08] pb-4 sm:pb-5"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />

              <span className="relative h-2 w-2 rounded-full bg-white" />
            </span>

            <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/45 sm:text-[10px] sm:tracking-[0.35em]">
              Venu Trinity / Creative Digital Studio
            </span>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/25 sm:block">
            Est. 2026
          </span>
        </motion.div>

        {/* =====================================================
            HERO GRID
        ====================================================== */}

        <div className="grid flex-1 items-center gap-6 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-0 lg:py-8">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            style={{
              y: titleY,
              opacity: heroOpacity,
            }}
            className="relative z-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="mb-5 text-[9px] uppercase tracking-[0.3em] text-white/30 sm:mb-6 sm:text-[10px]"
            >
              Design / Motion / Digital
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-4xl text-[24vw] font-semibold leading-[0.76] tracking-[-0.095em] sm:text-[110px] md:text-[125px] lg:text-[118px] xl:text-[145px]"
            >
              WE
              <br />
              <span className="text-white/[0.20]">CREATE.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-6 flex items-start gap-4 sm:mt-8 sm:gap-6"
            >
              <div className="mt-3 h-px w-10 shrink-0 bg-white/30 sm:w-20" />

              <p className="max-w-[310px] text-[13px] leading-6 text-white/45 sm:max-w-md sm:text-base sm:leading-8">
                We create visual identities, content and digital experiences
                designed to make brands impossible to ignore.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:gap-3"
            >
              <a
                href="#work"
                className="group inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 sm:h-auto sm:px-7 sm:py-4"
              >
                Explore our work

                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                className="group inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.025] px-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.06] sm:h-auto sm:px-7 sm:py-4"
              >
                Start a project

                <span className="ml-3 opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT PORTFOLIO VISUAL
          ================================================== */}

          <motion.div
            style={{
              y: artworkY,
              rotate: artworkRotate,
              scale: artworkScale,
            }}
            className="relative mx-auto mt-2 h-[390px] w-full max-w-[720px] [perspective:1400px] sm:mt-0 sm:h-[520px] lg:h-[560px]"
          >
            {/* Orbit */}
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] sm:h-[270px] sm:w-[270px]" />

            <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] sm:h-[390px] sm:w-[390px]" />

            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.022] sm:h-[510px] sm:w-[510px]" />

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.07] blur-[90px] sm:h-[280px] sm:w-[280px] sm:blur-[100px]" />

            {/* =================================================
                MAIN PROJECT
            ================================================== */}

            {projects[0] && (
              <motion.a
                href={`/portfolio/${projects[0].slug}`}
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.035,
                  y: -8,
                  rotateX: -2,
                  rotateY: 3,
                }}
                className="absolute left-1/2 top-1/2 z-20 w-[190px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] sm:w-[280px] md:w-[300px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-white/15 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.75)] sm:rounded-[26px]">
                  {projects[0].images?.[0] ? (
                    <img
                      src={projects[0].images[0]}
                      alt={projects[0].title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/[0.05]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

                  {/* Label */}
                  <div className="absolute left-3 right-3 top-3 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
                    <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[6px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[8px] sm:tracking-[0.25em]">
                      Featured Work
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/20 text-xs text-white backdrop-blur-md sm:h-8 sm:w-8 sm:text-sm">
                      ↗
                    </span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <p className="text-[6px] uppercase tracking-[0.25em] text-white/45 sm:text-[8px] sm:tracking-[0.28em]">
                      {projects[0].category}
                    </p>

                    <h2 className="mt-1.5 line-clamp-2 text-base font-medium leading-tight tracking-[-0.04em] text-white sm:mt-2 sm:text-2xl">
                      {projects[0].title}
                    </h2>
                  </div>
                </div>
              </motion.a>
            )}

            {/* =================================================
                LEFT PROJECT
            ================================================== */}

            {projects[1] && (
              <motion.a
                href={`/portfolio/${projects[1].slug}`}
                initial={{
                  opacity: 0,
                  x: -25,
                  y: 10,
                }}
                animate={{
                  opacity: 0.82,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -10,
                  rotate: -3,
                  scale: 1.06,
                  rotateY: -5,
                }}
                className="absolute left-[2%] top-[13%] z-30 w-[95px] -rotate-[7deg] [transform-style:preserve-3d] sm:left-[5%] sm:top-[17%] sm:w-[160px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-white/15 bg-[#0b0b0b] shadow-[0_20px_60px_rgba(0,0,0,0.65)] sm:rounded-[18px]">
                  {projects[1].images?.[0] ? (
                    <img
                      src={projects[1].images[0]}
                      alt={projects[1].title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/[0.04]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
                    <p className="text-[5px] uppercase tracking-[0.2em] text-white/45 sm:text-[7px] sm:tracking-[0.22em]">
                      {projects[1].category}
                    </p>

                    <p className="mt-1 line-clamp-2 text-[9px] font-medium leading-tight text-white sm:text-[11px]">
                      {projects[1].title}
                    </p>
                  </div>
                </div>
              </motion.a>
            )}

            {/* =================================================
                RIGHT PROJECT
            ================================================== */}

            {projects[2] && (
              <motion.a
                href={`/portfolio/${projects[2].slug}`}
                initial={{
                  opacity: 0,
                  x: 25,
                  y: 15,
                }}
                animate={{
                  opacity: 0.82,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -10,
                  rotate: 3,
                  scale: 1.06,
                  rotateY: 5,
                }}
                className="absolute bottom-[8%] right-[1%] z-30 w-[100px] rotate-[7deg] [transform-style:preserve-3d] sm:bottom-[10%] sm:right-[4%] sm:w-[170px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-white/15 bg-[#0b0b0b] shadow-[0_20px_60px_rgba(0,0,0,0.65)] sm:rounded-[18px]">
                  {projects[2].images?.[0] ? (
                    <img
                      src={projects[2].images[0]}
                      alt={projects[2].title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/[0.04]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
                    <p className="text-[5px] uppercase tracking-[0.2em] text-white/45 sm:text-[7px] sm:tracking-[0.22em]">
                      {projects[2].category}
                    </p>

                    <p className="mt-1 line-clamp-2 text-[9px] font-medium leading-tight text-white sm:text-[11px]">
                      {projects[2].title}
                    </p>
                  </div>
                </div>
              </motion.a>
            )}

            {/* =================================================
                BACKGROUND PROJECT 4
            ================================================== */}

            {projects[3] && (
              <motion.a
                href={`/portfolio/${projects[3].slug}`}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 0.32,
                  scale: 1,
                }}
                transition={{
                  delay: 0.9,
                  duration: 0.8,
                }}
                whileHover={{
                  scale: 1.06,
                  opacity: 0.55,
                }}
                className="absolute right-[16%] top-[4%] z-10 hidden w-[95px] rotate-[4deg] sm:block"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] shadow-xl">
                  {projects[3].images?.[0] ? (
                    <img
                      src={projects[3].images[0]}
                      alt={projects[3].title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/[0.04]" />
                  )}
                </div>
              </motion.a>
            )}

            {/* =================================================
                BACKGROUND PROJECT 5
            ================================================== */}

            {projects[4] && (
              <motion.a
                href={`/portfolio/${projects[4].slug}`}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 0.32,
                  scale: 1,
                }}
                transition={{
                  delay: 1.05,
                  duration: 0.8,
                }}
                whileHover={{
                  scale: 1.06,
                  opacity: 0.55,
                }}
                className="absolute bottom-[7%] left-[16%] z-10 hidden w-[90px] -rotate-[5deg] sm:block"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] shadow-xl">
                  {projects[4].images?.[0] ? (
                    <img
                      src={projects[4].images[0]}
                      alt={projects[4].title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/[0.04]" />
                  )}
                </div>
              </motion.a>
            )}

            {/* =================================================
                ORBIT DETAILS
            ================================================== */}

            <span className="absolute left-[11%] top-[5%] h-1.5 w-1.5 rounded-full bg-white/65 shadow-[0_0_20px_rgba(255,255,255,0.5)] sm:h-2 sm:w-2" />

            <span className="absolute right-[11%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/45" />

            <span className="absolute bottom-[5%] left-[27%] h-1.5 w-1.5 rounded-full bg-white/35" />

            <div className="absolute right-0 top-[9%] hidden rotate-90 text-[8px] uppercase tracking-[0.45em] text-white/20 sm:block">
              Visual / Motion / Digital
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM SYSTEM
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-2 border-t border-white/[0.08] pt-5 sm:grid-cols-4 sm:pt-6"
        >
          <div className="border-r border-white/[0.08] pr-4 sm:px-5 sm:first:pl-0">
            <p className="text-[7px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
              Services
            </p>

            <p className="mt-1.5 text-[11px] text-white/75 sm:mt-2 sm:text-sm">
              Design / Video / Web
            </p>
          </div>

          <div className="pl-4 sm:px-5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
              Work
            </p>

            <p className="mt-1.5 text-[11px] text-white/75 sm:mt-2 sm:text-sm">
              {projects.length > 0
                ? `${projects.length} Selected`
                : "Selected"}
            </p>
          </div>

          <div className="mt-4 border-r border-white/[0.08] pr-4 sm:mt-5 sm:px-5 sm:pb-1">
            <p className="text-[7px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
              Approach
            </p>

            <p className="mt-1.5 text-[11px] text-white/75 sm:mt-2 sm:text-sm">
              Digital First
            </p>
          </div>

          <div className="mt-4 pl-4 sm:mt-5 sm:px-5 sm:pb-1 sm:pr-0">
            <p className="text-[7px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
              Based
            </p>

            <p className="mt-1.5 text-[11px] text-white/75 sm:mt-2 sm:text-sm">
              India / Worldwide
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            SCROLL
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-5 flex items-center justify-between sm:mt-7"
        >
          <div className="flex items-center gap-3 text-[7px] uppercase tracking-[0.3em] text-white/20 sm:text-[8px] sm:tracking-[0.35em]">
            <span className="h-6 w-px bg-white/20 sm:h-7" />
            Scroll to explore
          </div>

          <span className="text-[7px] uppercase tracking-[0.3em] text-white/15 sm:text-[8px] sm:tracking-[0.35em]">
            01 / 10
          </span>
        </motion.div>
      </div>
    </section>
  );
}