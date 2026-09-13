"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/admin/customers",
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (response.status === 403) {
          window.location.href = "/dashboard";
          return;
        }

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load customers"
          );
        }

        setCustomers(
          Array.isArray(data.customers)
            ? data.customers
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load customers:",
          error
        );

        setError(
          "Unable to load customers. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name
          .toLowerCase()
          .includes(query) ||
        customer.email
          .toLowerCase()
          .includes(query) ||
        customer.phone
          .toLowerCase()
          .includes(query)
      );
    });
  }, [customers, search]);

  const customersWithOrders = customers.filter(
    (customer) => customer.totalOrders > 0
  ).length;

  const totalRevenue = customers.reduce(
    (total, customer) =>
      total + customer.totalSpent,
    0
  );

  const totalOrders = customers.reduce(
    (total, customer) =>
      total + customer.totalOrders,
    0
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-3 w-32 rounded bg-white/10" />

            <div className="mt-5 h-12 w-64 rounded bg-white/10" />

            <div className="mt-3 h-4 w-80 rounded bg-white/5" />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
              <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
              <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
              <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
            </div>

            <div className="mt-6 h-96 rounded-[1.5rem] bg-white/[0.025]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Venu Trinity / Administration
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Customers
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
              Manage your customers and understand
              their activity across Venu Trinity.
            </p>
          </div>

          <Link
            href="/admin"
            className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
          >
            <span>←</span>
            Dashboard
          </Link>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* STATS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Customers
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {customers.length}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Total registered customers
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.06 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Active Customers
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {customersWithOrders}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Customers with orders
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.12 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Orders
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {totalOrders}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Customer orders
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.18 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Revenue
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {formatCurrency(totalRevenue)}
            </p>

            <p className="mt-2 text-xs text-white/25">
              From paid orders
            </p>
          </motion.div>
        </div>

        {/* CUSTOMER LIST */}

        <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025]">

          {/* TOOLBAR */}

          <div className="flex flex-col gap-5 border-b border-white/[0.07] p-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                Customer Directory
              </p>

              <h2 className="mt-2 text-xl font-medium tracking-[-0.03em]">
                All Customers
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search customers..."
                className="w-full rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-white/25"
              />
            </div>
          </div>

          {/* RESULT COUNT */}

          <div className="border-b border-white/[0.07] px-6 py-4">
            <p className="text-[10px] text-white/25">
              Showing{" "}
              <span className="text-white/60">
                {filteredCustomers.length}
              </span>{" "}
              of{" "}
              <span className="text-white/60">
                {customers.length}
              </span>{" "}
              customers
            </p>
          </div>

          {filteredCustomers.length === 0 ? (
            <div className="p-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/25">
                VT
              </div>

              <h3 className="mt-5 text-base font-medium">
                No customers found
              </h3>

              <p className="mt-2 text-sm text-white/30">
                Try a different search term.
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[950px] text-left">

                  <thead className="border-b border-white/[0.07]">
                    <tr className="text-[9px] uppercase tracking-[0.2em] text-white/25">

                      <th className="px-6 py-4 font-medium">
                        Customer
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Contact
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Orders
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Spent
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Joined
                      </th>

                      <th className="px-6 py-4 text-right font-medium">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.06]">

                    {filteredCustomers.map(
                      (customer) => (
                        <tr
                          key={customer.id}
                          className="group transition-colors duration-300 hover:bg-white/[0.02]"
                        >

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-medium">
                                {customer.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white">
                                  {customer.name}
                                </p>

                                <p className="mt-1 truncate text-[10px] text-white/20">
                                  {customer.id}
                                </p>
                              </div>

                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm text-white/60">
                              {customer.email}
                            </p>

                            <p className="mt-1 text-xs text-white/25">
                              {customer.phone ||
                                "No phone"}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60">
                              {customer.totalOrders}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm font-medium text-white/80">
                              {formatCurrency(
                                customer.totalSpent
                              )}
                            </p>

                            <p className="mt-1 text-[10px] text-white/20">
                              Paid orders
                            </p>
                          </td>

                          <td className="px-6 py-5 text-xs text-white/35">
                            {formatDate(
                              customer.createdAt
                            )}
                          </td>

                          <td className="px-6 py-5 text-right">
                            <Link
                              href={`/admin/customers/${customer.id}`}
                              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] text-white/40 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
                            >
                              View
                            </Link>
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>
                </table>
              </div>

              {/* MOBILE / TABLET CARDS */}

              <div className="divide-y divide-white/[0.07] lg:hidden">

                {filteredCustomers.map(
                  (customer) => (
                    <div
                      key={customer.id}
                      className="p-5 sm:p-6"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-4">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-medium">
                            {customer.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-medium">
                              {customer.name}
                            </h3>

                            <p className="mt-1 truncate text-xs text-white/35">
                              {customer.email}
                            </p>
                          </div>

                        </div>

                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] text-white/40">
                          Customer
                        </span>

                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                            Orders
                          </p>

                          <p className="mt-2 text-sm text-white/70">
                            {customer.totalOrders}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                            Spent
                          </p>

                          <p className="mt-2 text-sm text-white/70">
                            {formatCurrency(
                              customer.totalSpent
                            )}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                            Phone
                          </p>

                          <p className="mt-2 truncate text-xs text-white/50">
                            {customer.phone ||
                              "Not provided"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                            Joined
                          </p>

                          <p className="mt-2 text-xs text-white/50">
                            {formatDate(
                              customer.createdAt
                            )}
                          </p>
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            </>
          )}
        </section>

      </div>
    </main>
  );
}