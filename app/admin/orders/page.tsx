"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Order = {
  id: string;
  orderNumber: string;

  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

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

  createdAt: string;
};

type Filter =
  | "all"
  | "pending"
  | "paid"
  | "processing"
  | "completed"
  | "cancelled";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/orders", {
          credentials: "include",
          cache: "no-store",
        });

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
            data.message || "Failed to load orders"
          );
        }

        setOrders(
          Array.isArray(data.orders)
            ? data.orders
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load admin orders:",
          error
        );

        setError(
          "Unable to load orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.orderNumber
          .toLowerCase()
          .includes(query) ||
        order.customer.name
          .toLowerCase()
          .includes(query) ||
        order.customer.email
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "all" ||
        order.paymentStatus === filter ||
        order.orderStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, filter, search]);

  const stats = useMemo(() => {
    const paid = orders.filter(
      (order) => order.paymentStatus === "paid"
    ).length;

    const pending = orders.filter(
      (order) => order.paymentStatus === "pending"
    ).length;

    const processing = orders.filter(
      (order) => order.orderStatus === "processing"
    ).length;

    const revenue = orders
      .filter(
        (order) => order.paymentStatus === "paid"
      )
      .reduce(
        (total, order) => total + order.totalAmount,
        0
      );

    return {
      total: orders.length,
      paid,
      pending,
      processing,
      revenue,
    };
  }, [orders]);

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

  const paymentClasses = (status: Order["paymentStatus"]) => {
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

  const orderClasses = (status: Order["orderStatus"]) => {
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

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Venu Trinity / Administration
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Orders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Manage customer orders, payments and
              fulfillment from one place.
            </p>
          </div>

          <Link
            href="/admin"
            className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <span>←</span>
            Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Orders"
            value={stats.total}
          />

          <StatCard
            label="Paid Orders"
            value={stats.paid}
          />

          <StatCard
            label="Processing"
            value={stats.processing}
          />

          <StatCard
            label="Revenue"
            value={formatCurrency(stats.revenue)}
          />
        </div>

        {/* Controls */}
        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/25">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search order, customer or email..."
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/25"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                ["all", "All"],
                ["pending", "Pending"],
                ["paid", "Paid"],
                ["processing", "Processing"],
                ["completed", "Completed"],
                ["cancelled", "Cancelled"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFilter(value as Filter)
                  }
                  className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs transition-all duration-300 ${
                    filter === value
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-6 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/[0.025]"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.025] px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/30">
              ○
            </div>

            <h2 className="mt-5 text-lg font-medium">
              No orders found
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Try changing your search or filter.
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && filteredOrders.length > 0 && (
          <div className="mt-6 hidden overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] md:block">

            <div className="grid grid-cols-[1.4fr_1.4fr_1fr_0.8fr_0.9fr_0.8fr] gap-4 border-b border-white/10 px-6 py-4 text-[9px] uppercase tracking-[0.22em] text-white/25">
              <span>Order</span>
              <span>Customer</span>
              <span>Amount</span>
              <span>Payment</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  className="grid grid-cols-[1.4fr_1.4fr_1fr_0.8fr_0.9fr_0.8fr] items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.025]"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {order.orderNumber}
                    </p>

                    <p className="mt-1 text-[11px] text-white/25">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm text-white/80">
                      {order.customer.name}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-white/30">
                      {order.customer.email}
                    </p>
                  </div>

                  <p className="text-sm font-medium">
                    {formatCurrency(order.totalAmount)}
                  </p>

                  <span
                    className={`w-fit rounded-full border px-3 py-1.5 text-[9px] capitalize ${paymentClasses(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>

                  <span
                    className={`w-fit rounded-full border px-3 py-1.5 text-[9px] capitalize ${orderClasses(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>

                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex w-fit h-9 items-center justify-center rounded-full border border-white/10 px-4 text-[10px] text-white/50 transition-all duration-300 hover:border-white/30 hover:bg-white hover:text-black"
                  >
                    View
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && filteredOrders.length > 0 && (
          <div className="mt-6 space-y-3 md:hidden">
            {filteredOrders.map((order, index) => (
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
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      {order.orderNumber}
                    </p>

                    <p className="mt-1 text-[11px] text-white/30">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <p className="text-sm text-white/80">
                    {order.customer.name}
                  </p>

                  <p className="mt-1 break-all text-xs text-white/30">
                    {order.customer.email}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[9px] capitalize ${paymentClasses(
                      order.paymentStatus
                    )}`}
                  >
                    Payment: {order.paymentStatus}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-[9px] capitalize ${orderClasses(
                      order.orderStatus
                    )}`}
                  >
                    Order: {order.orderStatus}
                  </span>
                </div>

                <Link
                  href={`/admin/orders/${order.id}`}
                  className="mt-5 flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white/60 transition-all hover:bg-white hover:text-black"
                >
                  View Order
                  <span className="ml-2">↗</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer info */}
        {!loading && orders.length > 0 && (
          <div className="mt-5 flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredOrders.length} of{" "}
              {orders.length} orders
            </span>

            <span>
              Pending payments: {stats.pending}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
        {label}
      </p>

      <p className="mt-3 text-2xl font-medium tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}
