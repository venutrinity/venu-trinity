"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type CustomerOrder = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "completed"
    | "cancelled";
  itemCount: number;
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;

  stats: {
    totalOrders: number;
    totalSpent: number;
    pendingOrders: number;
    processingOrders: number;
    completedOrders: number;
    paidOrders: number;
  };

  orders: CustomerOrder[];
};

export default function AdminCustomerDetailsPage() {
  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadCustomer() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/customers/${encodeURIComponent(
            id
          )}`,
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
              "Failed to load customer"
          );
        }

        setCustomer(data.customer);
      } catch (error) {
        console.error(
          "Failed to load customer:",
          error
        );

        setError(
          "Unable to load customer details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, [id]);

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

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const paymentClasses = (
    status: CustomerOrder["paymentStatus"]
  ) => {
    switch (status) {
      case "paid":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

      case "failed":
        return "border-red-500/20 bg-red-500/10 text-red-400";

      case "refunded":
        return "border-violet-500/20 bg-violet-500/10 text-violet-400";

      default:
        return "border-amber-500/20 bg-amber-500/10 text-amber-400";
    }
  };

  const orderClasses = (
    status: CustomerOrder["orderStatus"]
  ) => {
    switch (status) {
      case "completed":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

      case "processing":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";

      case "cancelled":
        return "border-red-500/20 bg-red-500/10 text-red-400";

      default:
        return "border-white/10 bg-white/[0.04] text-white/50";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="h-3 w-40 rounded bg-white/10" />

          <div className="mt-6 h-12 w-72 rounded bg-white/10" />

          <div className="mt-3 h-4 w-56 rounded bg-white/5" />

          <div className="mt-10 h-52 rounded-[1.5rem] bg-white/[0.025]" />

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
            <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
            <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
            <div className="h-32 rounded-[1.5rem] bg-white/[0.025]" />
          </div>

        </div>
      </main>
    );
  }

  if (error || !customer) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm text-red-400">
              {error || "Customer not found."}
            </p>
          </div>

          <Link
            href="/admin/customers"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition hover:bg-white hover:text-black"
          >
            ← Back to Customers
          </Link>

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
              Customer Details
            </h1>

            <p className="mt-3 text-sm text-white/30">
              View customer information and order activity.
            </p>
          </div>

          <Link
            href="/admin/customers"
            className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
          >
            <span>←</span>
            Back to Customers
          </Link>

        </div>

        {/* CUSTOMER PROFILE */}

        <motion.section
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
          }}
          className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8"
        >

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              {customer.avatar ? (
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="h-16 w-16 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg font-medium">
                  {customer.name
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div className="min-w-0">

                <h2 className="text-2xl font-medium tracking-[-0.03em]">
                  {customer.name}
                </h2>

                <p className="mt-1 break-all text-sm text-white/35">
                  {customer.email}
                </p>

                <p className="mt-2 text-xs text-white/20">
                  Customer since{" "}
                  {formatDate(
                    customer.createdAt
                  )}
                </p>

              </div>

            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-4">

              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Customer ID
              </p>

              <p className="mt-2 break-all text-xs text-white/40">
                {customer.id}
              </p>

            </div>

          </div>

          {/* CONTACT INFO */}

          <div className="mt-8 grid gap-4 border-t border-white/[0.07] pt-8 sm:grid-cols-2">

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Email
              </p>

              <p className="mt-2 break-all text-sm text-white/65">
                {customer.email}
              </p>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Phone
              </p>

              <p className="mt-2 text-sm text-white/65">
                {customer.phone ||
                  "Not provided"}
              </p>
            </div>

          </div>

        </motion.section>

        {/* STATS */}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.05 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Total Orders
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {customer.stats.totalOrders}
            </p>

            <p className="mt-2 text-xs text-white/25">
              All orders
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
            transition={{ delay: 0.1 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Total Spent
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {formatCurrency(
                customer.stats.totalSpent
              )}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Paid orders
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
            transition={{ delay: 0.15 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Paid Orders
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {customer.stats.paidOrders}
            </p>

            <p className="mt-2 text-xs text-emerald-400/60">
              Successful payments
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
            transition={{ delay: 0.2 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Completed
            </p>

            <p className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              {customer.stats.completedOrders}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Completed orders
            </p>
          </motion.div>

        </div>

        {/* ORDER ACTIVITY */}

        <div className="mt-4 grid gap-4 lg:grid-cols-3">

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Pending
            </p>

            <p className="mt-4 text-2xl font-medium">
              {customer.stats.pendingOrders}
            </p>

          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Processing
            </p>

            <p className="mt-4 text-2xl font-medium text-blue-400">
              {customer.stats.processingOrders}
            </p>

          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6">

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Customer Status
            </p>

            <p className="mt-4 text-sm text-emerald-400">
              Active
            </p>

          </div>

        </div>

        {/* ORDER HISTORY */}

        <motion.section
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
            delay: 0.2,
          }}
          className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025]"
        >

          <div className="border-b border-white/[0.07] p-6 sm:p-7">

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Customer Activity
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.03em]">
              Order History
            </h2>

          </div>

          {customer.orders.length === 0 ? (
            <div className="p-14 text-center sm:p-20">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/25">
                VT
              </div>

              <h3 className="mt-5 text-base font-medium">
                No orders yet
              </h3>

              <p className="mt-2 text-sm text-white/30">
                This customer hasn't placed an order yet.
              </p>

            </div>
          ) : (
            <div className="divide-y divide-white/[0.07]">

              {customer.orders.map(
                (order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="group block p-6 transition-colors duration-300 hover:bg-white/[0.02] sm:p-7"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="text-sm font-medium text-white">
                            {order.orderNumber}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-white/20" />

                          <span className="text-xs text-white/25">
                            {formatDateTime(
                              order.createdAt
                            )}
                          </span>

                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">

                          {order.products
                            .slice(0, 3)
                            .map(
                              (
                                product,
                                index
                              ) => (
                                <span
                                  key={`${order.id}-${index}`}
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/40"
                                >
                                  {product.name}
                                  {product.quantity > 1
                                    ? ` × ${product.quantity}`
                                    : ""}
                                </span>
                              )
                            )}

                        </div>

                        <p className="mt-3 text-xs text-white/25">
                          {order.itemCount}{" "}
                          {order.itemCount === 1
                            ? "item"
                            : "items"}
                        </p>

                      </div>

                      <div className="flex items-center justify-between gap-6 lg:justify-end">

                        <div className="text-left lg:text-right">

                          <p className="text-base font-medium">
                            {formatCurrency(
                              order.totalAmount
                            )}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 lg:justify-end">

                            <span
                              className={`rounded-full border px-3 py-1 text-[9px] capitalize ${paymentClasses(
                                order.paymentStatus
                              )}`}
                            >
                              {order.paymentStatus}
                            </span>

                            <span
                              className={`rounded-full border px-3 py-1 text-[9px] capitalize ${orderClasses(
                                order.orderStatus
                              )}`}
                            >
                              {order.orderStatus}
                            </span>

                          </div>

                        </div>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/30 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                          ↗
                        </span>

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>
          )}

        </motion.section>

      </div>
    </main>
  );
}