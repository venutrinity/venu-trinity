"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Download = {
  _id: string;
  productName: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  downloadCount: number;
  createdAt: string;
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDownloads() {
      try {
        setError("");

        const response = await fetch(
          "/api/downloads",
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
              "Failed to load downloads"
          );
        }

        setDownloads(data.downloads || []);
      } catch (error) {
        console.error(
          "Failed to load downloads:",
          error
        );

        setError(
          "Unable to load your downloads. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDownloads();
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-32 rounded bg-white/10" />

          <div className="mt-5 h-12 w-72 rounded bg-white/10" />

          <div className="mt-12 h-56 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
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
              My Downloads
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Access the digital products you've
              purchased from Venu Trinity.
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
            label="Available Files"
            value={downloads.length}
          />

          <StatCard
            number="02"
            label="Products"
            value={
              new Set(
                downloads.map(
                  (download) =>
                    download.productName
                )
              ).size
            }
          />

          <StatCard
            number="03"
            label="Total Downloads"
            value={downloads.reduce(
              (total, download) =>
                total +
                Number(download.downloadCount || 0),
              0
            )}
          />
        </div>

        {/* Downloads */}
        <section className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col gap-3 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Library
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Your Files
              </h2>
            </div>

            <p className="text-xs text-white/25">
              {downloads.length} file
              {downloads.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          {downloads.length === 0 ? (
            <div className="px-6 py-20 text-center md:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <span className="text-xl font-semibold tracking-[-0.08em] text-white/20">
                  VT
                </span>
              </div>

              <h3 className="mt-7 text-xl font-medium">
                No downloads yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/35">
                Your purchased digital files will
                appear here after your payment has
                been completed and download access
                has been enabled.
              </p>

              <Link
                href="/digital-products"
                className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition hover:bg-white/85"
              >
                Explore Digital Products →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {downloads.map(
                (download, index) => (
                  <motion.div
                    key={download._id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    className="p-6 transition-colors duration-300 hover:bg-white/[0.025] md:p-8"
                  >
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                      {/* Product / File */}
                      <div className="flex min-w-0 items-start gap-5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                          <span className="text-sm font-semibold tracking-[-0.08em] text-white/20">
                            VT
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                            Digital Product
                          </p>

                          <h3 className="mt-2 truncate text-base font-medium">
                            {download.productName}
                          </h3>

                          <p className="mt-2 truncate text-sm text-white/45">
                            {download.fileName}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/25">
                            <span>
                              {download.fileType}
                            </span>

                            <span>
                              Purchased{" "}
                              {formatDate(
                                download.createdAt
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Download count */}
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                          Downloads
                        </p>

                        <p className="mt-2 text-lg font-medium">
                          {download.downloadCount}
                        </p>
                      </div>

                      {/* Download */}
                      <div>
                        {download.fileUrl ? (
                          <a
                            href={download.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition-all duration-300 hover:bg-white/85"
                          >
                            Download
                            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                              ↓
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs text-white/30">
                            Download unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
        </section>

        {/* Security / future storage notice */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Digital Delivery
              </p>

              <h2 className="mt-3 text-lg font-medium">
                Secure downloads are coming.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/35">
                Download access will be connected to
                completed orders and secure file storage
                when the payment and delivery system is
                finalized.
              </p>
            </div>

            <Link
              href="/dashboard/orders"
              className="group flex w-fit shrink-0 items-center gap-2 text-xs text-white/40 transition hover:text-white"
            >
              View Orders
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
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