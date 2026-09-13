"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Invoice = {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  status: string;
  issuedAt: string;
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvoices() {
      try {
        setError("");

        const response = await fetch(
          "/api/invoices",
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
              "Failed to load invoices"
          );
        }

        setInvoices(data.invoices || []);
      } catch (error) {
        console.error(
          "Failed to load invoices:",
          error
        );

        setError(
          "Unable to load your billing information."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  const totalBilled = useMemo(() => {
    return invoices.reduce(
      (total, invoice) =>
        total + Number(invoice.totalAmount || 0),
      0
    );
  }, [invoices]);

  const paidInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.status.toLowerCase() === "paid"
    ).length;
  }, [invoices]);

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

  function getStatusStyle(status: string) {
    switch (status.toLowerCase()) {
      case "paid":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

      case "pending":
        return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";

      case "failed":
        return "border-red-400/20 bg-red-400/10 text-red-300";

      case "refunded":
        return "border-blue-400/20 bg-blue-400/10 text-blue-300";

      default:
        return "border-white/10 bg-white/[0.05] text-white/45";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-24 rounded bg-white/10" />

          <div className="mt-5 h-12 w-80 rounded bg-white/10" />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>

          <div className="mt-8 h-64 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
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
              Billing
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              View your payment history, invoices,
              and billing information.
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
            label="Total Invoices"
            value={invoices.length}
          />

          <StatCard
            number="02"
            label="Paid Invoices"
            value={paidInvoices}
          />

          <StatCard
            number="03"
            label="Total Billed"
            value={`₹${totalBilled}`}
          />
        </div>

        {/* Invoice History */}
        <section className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col gap-3 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Payments
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Invoice History
              </h2>
            </div>

            <p className="text-xs text-white/25">
              {invoices.length} invoice
              {invoices.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          {invoices.length === 0 ? (
            <div className="px-6 py-20 text-center md:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <span className="text-xl font-semibold tracking-[-0.08em] text-white/20">
                  VT
                </span>
              </div>

              <h3 className="mt-7 text-xl font-medium">
                No invoices yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/35">
                Your invoices will appear here after
                a successful purchase and payment.
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
              {invoices.map(
                (invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                    className="p-6 transition-colors duration-300 hover:bg-white/[0.025] md:p-8"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                      {/* Invoice */}
                      <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                          <span className="text-xs font-semibold tracking-[-0.08em] text-white/20">
                            VT
                          </span>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                            Invoice
                          </p>

                          <h3 className="mt-2 text-base font-medium">
                            {invoice.invoiceNumber}
                          </h3>

                          <p className="mt-1 text-xs text-white/30">
                            Issued{" "}
                            {formatDate(
                              invoice.issuedAt
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                          Amount
                        </p>

                        <p className="mt-2 text-xl font-medium">
                          ₹{invoice.totalAmount}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                          Status
                        </p>

                        <span
                          className={`mt-2 inline-flex rounded-full border px-3 py-1.5 text-[10px] capitalize ${getStatusStyle(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </div>

                      {/* Future invoice action */}
                      <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs text-white/25">
                        Invoice PDF coming soon
                      </span>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
        </section>

        {/* Billing Notice */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Billing System
              </p>

              <h2 className="mt-3 text-lg font-medium">
                Payments & invoices are being built.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/35">
                The final payment gateway, automatic
                invoice generation, and downloadable
                invoice PDFs will be connected when the
                payment system is finalized.
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