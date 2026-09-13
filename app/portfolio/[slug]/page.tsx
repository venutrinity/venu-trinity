"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";
import BackButton from "../../components/BackButton";

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
  createdAt: string;
  updatedAt: string;
};

export default function PortfolioProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] =
    useState<PortfolioProject | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] =
    useState<number | null>(null);

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;

      try {
        const response = await fetch(
          `/api/portfolio/${slug}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load project"
          );
        }

        const data = await response.json();

        setProject(data.project);
      } catch (error) {
        console.error(
          "Failed to load portfolio project:",
          error
        );

        setError("Project not found.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  /*
   * Disable page scrolling when
   * fullscreen image viewer is open.
   */
  useEffect(() => {
    if (selectedImage === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  /*
   * Keyboard controls
   */
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (selectedImage === null || !project) {
        return;
      }

      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (
        event.key === "ArrowRight" &&
        project.images.length > 0
      ) {
        setSelectedImage(
          (current) =>
            current === null
              ? 0
              : (current + 1) %
                project.images.length
        );
      }

      if (
        event.key === "ArrowLeft" &&
        project.images.length > 0
      ) {
        setSelectedImage(
          (current) =>
            current === null
              ? 0
              : (current -
                  1 +
                  project.images.length) %
                project.images.length
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedImage, project]);

  function showPreviousImage() {
    if (
      !project ||
      project.images.length === 0
    ) {
      return;
    }

    setSelectedImage(
      (current) =>
        current === null
          ? 0
          : (current -
              1 +
              project.images.length) %
            project.images.length
    );
  }

  function showNextImage() {
    if (
      !project ||
      project.images.length === 0
    ) {
      return;
    }

    setSelectedImage(
      (current) =>
        current === null
          ? 0
          : (current + 1) %
            project.images.length
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <div className="text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-white/20 border-t-white" />

            <p className="mt-5 text-sm text-white/40">
              Loading project...
            </p>

          </div>
        </main>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

          <div className="text-center">

            <BackButton />

            <p className="mt-10 text-sm uppercase tracking-[0.3em] text-white/30">
              Portfolio
            </p>

            <h1 className="mt-4 text-4xl font-semibold">
              Project not found
            </h1>

            <p className="mt-4 text-white/40">
              This project may have been removed
              or is not currently published.
            </p>

          </div>

        </main>
      </>
    );
  }

  const hasImages =
    project.images &&
    project.images.length > 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">

        {/* HERO */}

        <section className="px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-40">

          <div className="mx-auto max-w-7xl">

            <Reveal>
              <BackButton />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-12 text-xs uppercase tracking-[0.35em] text-white/40">
                {project.category}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[100px]">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-3xl text-base leading-8 text-white/40 md:text-lg">
                {project.description}
              </p>
            </Reveal>

          </div>

        </section>

        {/* MAIN VISUAL */}

        <section className="px-6 md:px-10">

          <div className="mx-auto max-w-7xl">

            <Reveal>

              <div
                onClick={() =>
                  hasImages &&
                  setSelectedImage(0)
                }
                className={`relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] ${
                  hasImages
                    ? "cursor-zoom-in"
                    : ""
                }`}
              >

                {hasImages ? (
                  <>
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                    />

                    {/* IMAGE HINT */}

                    <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                      Click to view
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-20">
                      <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">

                      <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md md:h-56 md:w-56">

                        <div className="absolute inset-4 rounded-full border border-white/[0.06]" />

                        <span className="text-5xl font-semibold tracking-[-0.08em] text-white/15 md:text-7xl">
                          VT
                        </span>

                      </div>

                    </div>
                  </>
                )}

              </div>

            </Reveal>

          </div>

        </section>

        {/* PROJECT INFORMATION */}

        <section className="px-6 py-20 md:px-10 md:py-28">

          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_320px]">

            {/* DESCRIPTION */}

            <Reveal>

              <div>

                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  About the project
                </p>

                <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">
                  Designed with intention.
                </h2>

                <p className="mt-8 max-w-3xl text-base leading-8 text-white/40">
                  {project.description}
                </p>

              </div>

            </Reveal>

            {/* DETAILS */}

            <Reveal delay={0.1}>

              <div className="space-y-8">

                {project.client && (
                  <div className="border-t border-white/10 pt-5">

                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                      Client
                    </p>

                    <p className="mt-2 text-sm text-white/70">
                      {project.client}
                    </p>

                  </div>
                )}

                <div className="border-t border-white/10 pt-5">

                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Category
                  </p>

                  <p className="mt-2 text-sm text-white/70">
                    {project.category}
                  </p>

                </div>

                {project.tools &&
                  project.tools.length > 0 && (
                    <div className="border-t border-white/10 pt-5">

                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                        Tools
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {project.tools.map(
                          (tool) => (
                            <span
                              key={tool}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50"
                            >
                              {tool}
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}

              </div>

            </Reveal>

          </div>

        </section>

        {/* ADDITIONAL IMAGES */}

        {project.images &&
          project.images.length > 1 && (
            <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">

              <div className="mx-auto max-w-7xl">

                <Reveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                    Project Gallery
                  </p>
                </Reveal>

                <div className="mt-10 grid gap-6 md:grid-cols-2">

                  {project.images
                    .slice(1)
                    .map(
                      (
                        image,
                        index
                      ) => (
                        <Reveal
                          key={image}
                          delay={
                            index *
                            0.08
                          }
                        >

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedImage(
                                index +
                                  1
                              )
                            }
                            className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-[#080808] text-left"
                          >

                            <div className="relative">

                              <img
                                src={image}
                                alt={`${project.title} ${
                                  index +
                                  2
                                }`}
                                className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                              />

                              <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/50 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                                View
                              </div>

                            </div>

                          </button>

                        </Reveal>
                      )
                    )}

                </div>

              </div>

            </section>
          )}

        {/* CTA */}

        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">

          <div className="mx-auto max-w-7xl">

            <Reveal>

              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Have a similar project?
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">

                Let&apos;s create something

                <span className="text-white/25">
                  {" "}
                  meaningful.
                </span>

              </h2>

            </Reveal>

            <Reveal delay={0.1}>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:scale-[1.03]"
              >
                Start a Project
                <span>→</span>
              </Link>

            </Reveal>

          </div>

        </section>

      </main>

      {/* FULLSCREEN IMAGE VIEWER */}

      {selectedImage !== null &&
        project.images[selectedImage] && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Project image viewer"
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setSelectedImage(null)
              }
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xl text-white/70 transition hover:bg-white/10 hover:text-white md:right-8 md:top-8"
            >
              ×
            </button>

            {/* IMAGE COUNT */}

            <div className="absolute left-5 top-5 z-20 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-md md:left-8 md:top-8">
              {selectedImage + 1} /{" "}
              {project.images.length}
            </div>

            {/* PREVIOUS */}

            {project.images.length > 1 && (
              <button
                type="button"
                onClick={
                  showPreviousImage
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-2xl text-white/60 backdrop-blur-md transition hover:bg-white/10 hover:text-white md:left-8 md:h-14 md:w-14"
              >
                ←
              </button>
            )}

            {/* NEXT */}

            {project.images.length > 1 && (
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-2xl text-white/60 backdrop-blur-md transition hover:bg-white/10 hover:text-white md:right-8 md:h-14 md:w-14"
              >
                →
              </button>
            )}

            {/* LARGE IMAGE */}

            <div className="flex h-full w-full items-center justify-center px-12 py-16 md:px-20 md:py-14">

              <img
                src={
                  project.images[
                    selectedImage
                  ]
                }
                alt={`${project.title} fullscreen`}
                className="max-h-full max-w-full object-contain"
              />

            </div>

            {/* BOTTOM TITLE */}

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-center text-xs text-white/50 backdrop-blur-md md:bottom-8">
              {project.title}
            </div>

          </div>
        )}
    </>
  );
}