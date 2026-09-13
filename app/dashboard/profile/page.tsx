"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  avatar?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setError("");

        const response = await fetch(
          "/api/auth/me",
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
              "Failed to load profile"
          );
        }

        setUser(data.user);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setError(
          "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="mt-5 h-12 w-64 rounded bg-white/10" />

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="h-80 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
            <div className="h-80 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
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
              My Profile
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Manage your Venu Trinity account
              information.
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
          <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-400/[0.06] p-5 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Main */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Profile Card */}
          <motion.section
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
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-8"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/[0.04]" />

            <div className="relative">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold tracking-[-0.08em] text-white/25">
                    VT
                  </span>
                )}
              </div>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/25">
                Account
              </p>

              <h2 className="mt-3 break-words text-2xl font-medium tracking-[-0.03em]">
                {user.name}
              </h2>

              <p className="mt-2 break-all text-sm text-white/35">
                {user.email}
              </p>

              <div className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                {user.role}
              </div>
            </div>
          </motion.section>

          {/* Account Information */}
          <motion.section
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
              delay: 0.1,
            }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
          >
            <div className="border-b border-white/10 p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Account
              </p>

              <h2 className="mt-3 text-xl font-medium">
                Account Information
              </h2>
            </div>

            <div className="divide-y divide-white/10">
              <ProfileRow
                number="01"
                label="Full Name"
                value={user.name}
              />

              <ProfileRow
                number="02"
                label="Email Address"
                value={user.email}
              />

              <ProfileRow
                number="03"
                label="Phone Number"
                value={
                  user.phone ||
                  "Not added yet"
                }
              />

              <ProfileRow
                number="04"
                label="Account Type"
                value={user.role}
                capitalize
              />
            </div>
          </motion.section>
        </div>

        {/* Account Actions */}
        <motion.section
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
            delay: 0.2,
          }}
          className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
        >
          <div className="border-b border-white/10 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Account
            </p>

            <h2 className="mt-3 text-xl font-medium">
              Quick Access
            </h2>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            <QuickLink
              href="/dashboard/orders"
              number="01"
              title="My Orders"
              description="View your purchase history."
            />

            <QuickLink
              href="/dashboard/downloads"
              number="02"
              title="Downloads"
              description="Access your digital files."
            />

            <QuickLink
              href="/digital-products"
              number="03"
              title="Digital Products"
              description="Explore creator resources."
            />
          </div>
        </motion.section>

        {/* Future Editing Notice */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Profile Settings
              </p>

              <h2 className="mt-3 text-lg font-medium">
                Profile editing is coming.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/35">
                Name, phone number, avatar, password,
                and other account settings will be
                editable once the account settings API
                is connected.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Coming Soon
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileRow({
  number,
  label,
  value,
  capitalize = false,
}: {
  number: string;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
      <div className="flex items-center gap-4">
        <span className="text-[9px] tracking-[0.2em] text-white/15">
          {number}
        </span>

        <span className="text-sm text-white/35">
          {label}
        </span>
      </div>

      <span
        className={`break-all text-sm text-white/75 sm:text-right ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function QuickLink({
  href,
  number,
  title,
  description,
}: {
  href: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-black p-6 transition-all duration-300 hover:bg-white/[0.04] md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="text-[9px] tracking-[0.2em] text-white/15">
          {number}
        </span>

        <span className="text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
          ↗
        </span>
      </div>

      <h3 className="mt-8 text-base font-medium">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-white/30">
        {description}
      </p>
    </Link>
  );
}