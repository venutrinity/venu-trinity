"use client";

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

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch("/api/courses");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading courses...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">
          My Courses
        </h1>

        <p className="mt-2 text-gray-500">
          Continue learning your purchased courses.
        </p>

        {courses.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-medium">
              No courses yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your purchased courses will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-2xl border border-gray-200"
              >
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="h-52 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <h2 className="text-xl font-medium">
                    {course.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {course.description}
                  </p>

                  <div className="mt-5">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-black"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button className="mt-6 rounded-xl bg-black px-5 py-3 text-sm text-white">
                    Continue Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}