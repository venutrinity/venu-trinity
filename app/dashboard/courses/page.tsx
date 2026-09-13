"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Course = {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  progress: number;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        setError("");

        const response = await fetch(
          "/api/courses",
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load courses"
          );
        }

        setCourses(data.courses || []);
      } catch (error) {
        console.error(
          "Failed to load courses:",
          error
        );

        setError(
          "Unable to load your courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const completedCourses = courses.filter(
    (course) => course.progress >= 100
  ).length;

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) =>
              total + Number(course.progress || 0),
            0
          ) / courses.length
        )
      : 0;

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-24 rounded bg-white/10" />

          <div className="mt-5 h-12 w-72 rounded bg-white/10" />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>

          <div className="mt-8 h-80 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white md:px-10 md:pt-40">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Dashboard
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl">
              My Courses
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Continue learning and track your
              progress across your courses.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            Dashboard
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-400/[0.06] p-5">
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            number="01"
            label="My Courses"
            value={courses.length}
          />

          <StatCard
            number="02"
            label="Completed"
            value={completedCourses}
          />

          <StatCard
            number="03"
            label="Average Progress"
            value={`${averageProgress}%`}
          />
        </div>

        {/* Course Library */}
        <section className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Learning
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Your Courses
            </h2>
          </div>

          {courses.length === 0 ? (
            <div className="px-6 py-20 text-center md:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <span className="text-xl font-semibold tracking-[-0.08em] text-white/20">
                  VT
                </span>
              </div>

              <h3 className="mt-7 text-xl font-medium">
                No courses yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/35">
                Your purchased courses will appear
                here when course access is available.
              </p>

              <Link
                href="/digital-products"
                className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition hover:bg-white/85"
              >
                Explore Venu Trinity →
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 p-5 md:grid-cols-2 md:p-6">
              {courses.map((course, index) => (
                <motion.article
                  key={course.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                  }}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="relative flex h-full items-center justify-center bg-gradient-to-br from-white/10 via-white/[0.03] to-black">
                        <div className="text-center">
                          <div className="text-7xl font-semibold tracking-[-0.08em] text-white/[0.08] md:text-8xl">
                            VT
                          </div>

                          <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-white/20">
                            Course
                          </p>
                        </div>

                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/[0.05]" />
                        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full border border-white/[0.04]" />
                      </div>
                    )}

                    <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-md">
                        Course
                      </span>

                      {course.progress >= 100 && (
                        <span className="rounded-full border border-emerald-400/20 bg-black/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7">
                    <h3 className="text-xl font-medium tracking-[-0.03em]">
                      {course.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/35">
                      {course.description}
                    </p>

                    {/* Progress */}
                    <div className="mt-7">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                          Progress
                        </span>

                        <span className="text-xs text-white/50">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${Math.min(
                              Math.max(
                                course.progress,
                                0
                              ),
                              100
                            )}%`,
                          }}
                          transition={{
                            duration: 0.9,
                            delay:
                              0.2 +
                              index * 0.06,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          className="h-full rounded-full bg-white"
                        />
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      disabled
                      className="mt-7 flex w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-xs text-white/40"
                    >
                      <span>
                        Continue Course
                      </span>

                      <span>→</span>
                    </button>

                    <p className="mt-3 text-center text-[10px] text-white/20">
                      Course player coming soon
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Future course system */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Learning Platform
              </p>

              <h2 className="mt-3 text-lg font-medium">
                Course player is coming.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/35">
                Lessons, video playback, progress
                tracking, course completion, and
                protected course content will be
                connected when the learning system is
                built.
              </p>
            </div>

            <span className="w-fit shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Coming Soon
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  number,
  label,
  value,
}: {
  number: string;
  label: string;
  value: string | number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
          {label}
        </p>

        <span className="text-[9px] tracking-[0.2em] text-white/15">
          {number}
        </span>
      </div>

      <p className="mt-5 text-3xl font-medium tracking-[-0.04em]">
        {value}
      </p>

      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full border border-white/[0.04] transition-transform duration-700 group-hover:scale-125" />
    </motion.div>
  );
}