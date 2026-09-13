"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | ""
  >("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Invalid email or password"
        );
        setMessageType("error");
        return;
      }

      setMessage("Login successful.");
      setMessageType("success");

      const role = data.user?.role;

      if (role === "admin") {
        router.push("/admin");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>
      </div>

      {/* Login Card */}
      <motion.div
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
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-md"
      >

        {/* Brand */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
              <span className="text-xs font-bold tracking-[-0.08em]">
                VT
              </span>
            </span>

            <span className="text-sm font-medium tracking-[-0.02em]">
              Venu Trinity
            </span>
          </Link>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-white/25">
            Member Access
          </p>

          <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em] md:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/35">
            Login to access your Venu Trinity
            account and dashboard.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-white/35"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/25 focus:bg-white/[0.06]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-white/35"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/25 focus:bg-white/[0.06]"
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"
                    : "border-red-400/20 bg-red-400/[0.06] text-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-between rounded-full bg-white px-5 py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Login"}
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/30">
              Don&apos;t have an account?
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block text-xs text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-white"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Back */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-xs text-white/25 transition hover:text-white/60"
          >
            ← Back to Venu Trinity
          </Link>
        </div>
      </motion.div>
    </main>
  );
}