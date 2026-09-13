"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

type AdminStats = {
  products: number;
  orders: number;
  customers: number;
  revenue: number;
};

const adminSections = [
  {
    number: "01",
    title: "Products",
    description:
      "Manage digital products, prices and publishing status.",
    href: "/admin/products",
  },
  {
    number: "02",
    title: "Portfolio",
    description:
      "Manage projects, images, categories and case studies.",
    href: "/admin/portfolio",
  },
  {
    number: "03",
    title: "Orders",
    description:
      "View customer orders and manage order status.",
    href: "/admin/orders",
  },
  {
    number: "04",
    title: "Customers",
    description:
      "View customers and their account information.",
    href: "/admin/customers",
  },
];

export default function AdminDashboardPage() {
  const [user, setUser] =
    useState<AdminUser | null>(null);

  const [stats, setStats] =
    useState<AdminStats>({
      products: 0,
      orders: 0,
      customers: 0,
      revenue: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        /* -------------------------
           Authentication
        ------------------------- */

        const authResponse =
          await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          });

        if (authResponse.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (!authResponse.ok) {
          throw new Error(
            "Authentication check failed"
          );
        }

        const authData =
          await authResponse.json();

        if (
          !authData.success ||
          !authData.user
        ) {
          window.location.href = "/login";
          return;
        }

        /* -------------------------
           Admin role check
        ------------------------- */

        if (
          authData.user.role !== "admin"
        ) {
          window.location.href =
            "/dashboard";
          return;
        }

        if (!mounted) return;

        setUser(authData.user);

        /* -------------------------
           Admin statistics
        ------------------------- */

        const statsResponse =
          await fetch(
            "/api/admin/stats",
            {
              method: "GET",
              credentials: "include",
              cache: "no-store",
            }
          );

        if (statsResponse.status === 401) {
          window.location.href =
            "/login";
          return;
        }

        if (statsResponse.status === 403) {
          window.location.href =
            "/dashboard";
          return;
        }

        if (!statsResponse.ok) {
          throw new Error(
            "Failed to load dashboard statistics"
          );
        }

        const statsData =
          await statsResponse.json();

        if (
          !statsData.success ||
          !statsData.stats
        ) {
          throw new Error(
            "Invalid dashboard statistics response"
          );
        }

        if (!mounted) return;

        setStats({
          products: Number(
            statsData.stats.products ?? 0
          ),
          orders: Number(
            statsData.stats.orders ?? 0
          ),
          customers: Number(
            statsData.stats.customers ?? 0
          ),
          revenue: Number(
            statsData.stats.revenue ?? 0
          ),
        });
      } catch (error) {
        console.error(
          "Failed to load admin dashboard:",
          error
        );

        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load admin dashboard"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="text-sm text-white/60">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-white/[0.03] p-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-red-400">
            Dashboard Error
          </p>

          <h1 className="mt-4 text-2xl font-semibold">
            Unable to load dashboard
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/50">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <main className="min-h-screen bg-black px-5 py-28 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            Venu Trinity / Admin
          </p>

          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl md:text-7xl">
                Admin Dashboard
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
                Manage the Venu Trinity digital ecosystem from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green-400" />

              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                Admin Access
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Products",
              value: stats.products,
            },
            {
              label: "Orders",
              value: stats.orders,
            },
            {
              label: "Customers",
              value: stats.customers,
            },
            {
              label: "Revenue",
              value: `₹${stats.revenue.toLocaleString(
                "en-IN"
              )}`,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                {stat.label}
              </p>

              <p className="mt-6 text-4xl font-medium tracking-[-0.05em] md:text-5xl">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CMS */}
        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Content Management
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                Manage your website
              </h2>
            </div>

            <span className="hidden text-xs text-white/25 sm:block">
              04 Sections
            </span>
          </div>

          <div className="border-t border-white/10">
            {adminSections.map(
              (section, index) => (
                <motion.div
                  key={section.href}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      0.25 +
                      index * 0.08,
                  }}
                >
                  <Link
                    href={section.href}
                    className="group relative grid gap-5 border-b border-white/10 py-7 transition-colors duration-300 md:grid-cols-[80px_1fr_300px_50px] md:items-center"
                  >
                    <span className="text-[10px] tracking-[0.25em] text-white/25">
                      {section.number}
                    </span>

                    <div>
                      <h3 className="text-2xl font-medium tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                        {section.title}
                      </h3>
                    </div>

                    <p className="max-w-sm text-sm leading-6 text-white/35 transition-colors duration-300 group-hover:text-white/55">
                      {section.description}
                    </p>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-white/40 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      ↗
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Account */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.6,
          }}
          className="mt-16 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            Current Session
          </p>

          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-medium">
                {user.role}
              </p>

              <p className="mt-1 break-all text-xs text-white/30">
                {user.email}
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
              Authenticated
            </span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}