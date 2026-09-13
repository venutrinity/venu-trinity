"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "completed"
    | "cancelled";
  createdAt: string;
  items: OrderItem[];
};

type Filter =
  | "all"
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    async function loadOrders() {
      try {
        setError("");

        const response = await fetch("/api/orders", {
          credentials: "include",
          cache: "no-store",
        });

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load orders"
          );
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error(
          "Failed to load customer orders:",
          error
        );

        setError(
          "Unable to load your orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (filter === "all") {
      return orders;
    }

    return orders.filter(
      (order) => order.orderStatus === filter
    );
  }, [orders, filter]);

  const totalSpent = orders
    .filter(
      (order) => order.paymentStatus === "paid"
    )
    .reduce(
      (total, order) =>
        total + Number(order.totalAmount),
      0
    );

  const pendingCount = orders.filter(
    (order) =>
      order.orderStatus === "pending"
  ).length;

  const completedCount = orders.filter(
    (order) =>
      order.orderStatus === "completed"
  ).length;

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
    switch (status) {
      case "completed":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

      case "processing":
        return "border-blue-400/20 bg-blue-400/10 text-blue-300";

      case "cancelled":
        return "border-red-400/20 bg-red-400/10 text-red-300";

      default:
        return "border-white/10 bg-white/[0.05] text-white/50";
    }
  }

  function getPaymentStyle(status: string) {
    switch (status) {
      case "paid":
        return "text-emerald-300";

      case "failed":
        return "text-red-300";

      case "refunded":
        return "text-yellow-300";

      default:
        return "text-white/45";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-3 w-24 rounded bg-white/10" />
            <div className="mt-5 h-12 w-64 rounded bg-white/10" />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-3xl border border-white/10 bg-white/[0.03]"
                />
              ))}
            </div>

            <div className="mt-8 h-64 rounded-3xl border border-white/10 bg-white/[0.03]" />
          </div>
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
              My Orders
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              View your purchases, payment status,
              and order progress.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <span>←</span>
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-400/[0.06] p-5 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Orders"
            value={orders.length}
            number="01"
          />

          <StatCard
            label="Pending"
            value={pendingCount}
            number="02"
          />

          <StatCard
            label="Completed"
            value={completedCount}
            number="03"
          />

          <StatCard
            label="Total Spent"
            value={`₹${totalSpent}`}
            number="04"
          />
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["pending", "Pending"],
              ["processing", "Processing"],
              ["completed", "Completed"],
              ["cancelled", "Cancelled"],
            ] as [Filter, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-4 py-2.5 text-xs transition-all duration-300 ${
                filter === value
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Orders */}
        <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col gap-3 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Purchases
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Order History
              </h2>
            </div>

            <p className="text-xs text-white/30">
              {filteredOrders.length} order
              {filteredOrders.length === 1 ? "" : "s"}
            </p>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="px-6 py-20 text-center md:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <span className="text-xl text-white/20">
                  VT
                </span>
              </div>

              <h3 className="mt-6 text-xl font-medium">
                No orders found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/35">
                You don't have any orders in this
                category yet.
              </p>

              <Link
                href="/digital-products"
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition hover:bg-white/85"
              >
                Explore Digital Products →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredOrders.map(
                (order, index) => {
                  const firstItem =
                    order.items?.[0];

                  return (
                    <motion.div
                      key={order.id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      className="p-6 transition-colors duration-300 hover:bg-white/[0.025] md:p-8"
                    >
                      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                        {/* Product */}
                        <div className="flex min-w-0 items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                            <span className="text-xs font-semibold tracking-[-0.08em] text-white/25">
                              VT
                            </span>
                          </div>

                          <div className="min-w-0">
                            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                              {firstItem
                                ? "Digital Product"
                                : "Order"}
                            </p>

                            <h3 className="mt-1 truncate text-base font-medium text-white">
                              {firstItem?.name ||
                                "Digital Product"}
                            </h3>

                            <p className="mt-1 text-xs text-white/30">
                              {order.orderNumber}
                            </p>

                            <p className="mt-1 text-xs text-white/25">
                              {formatDate(
                                order.createdAt
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
                            ₹{order.totalAmount}
                          </p>
                        </div>

                        {/* Payment */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                            Payment
                          </p>

                          <p
                            className={`mt-2 text-xs font-medium capitalize ${getPaymentStyle(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </p>
                        </div>

                        {/* Order Status */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                            Status
                          </p>

                          <span
                            className={`mt-2 inline-flex rounded-full border px-3 py-1.5 text-[10px] capitalize ${getStatusStyle(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>

                        {/* View */}
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/55 transition-all duration-300 hover:border-white/30 hover:bg-white hover:text-black"
                        >
                          View Order
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  number,
}: {
  label: string;
  value: string | number;
  number: string;
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