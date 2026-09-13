"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type OrderItem = {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "completed"
    | "cancelled";
  paymentId: string;
  createdAt: string;
  updatedAt: string;
};

export default function CustomerOrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        setError("");

        const response = await fetch(
          `/api/orders/${id}`,
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
            data.message || "Failed to load order"
          );
        }

        setOrder(data.order);
      } catch (error) {
        console.error(
          "Failed to load customer order:",
          error
        );

        setError(
          "Unable to load this order."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadOrder();
    }
  }, [id]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  function formatDateTime(date: string) {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  function getPaymentStyle(status: string) {
    switch (status) {
      case "paid":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

      case "failed":
        return "border-red-400/20 bg-red-400/10 text-red-300";

      case "refunded":
        return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";

      default:
        return "border-white/10 bg-white/[0.05] text-white/50";
    }
  }

  function getOrderStyle(status: string) {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-28 rounded bg-white/10" />
          <div className="mt-6 h-12 w-80 rounded bg-white/10" />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-96 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
            <div className="h-96 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-black px-6 py-32 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Dashboard
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
            Order not found
          </h1>

          <p className="mt-4 text-sm text-white/40">
            {error ||
              "This order may no longer be available."}
          </p>

          <Link
            href="/dashboard/orders"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/85"
          >
            ← Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  const firstItem = order.items?.[0];

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white md:px-10 md:pt-40">
      <div className="mx-auto max-w-7xl">

        {/* Top navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard/orders"
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/35 transition hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            My Orders
          </Link>

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/20">
            Order Details
          </span>
        </div>

        {/* Header */}
        <div className="mt-12 flex flex-col gap-8 border-b border-white/10 pb-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Order
            </p>

            <h1 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {order.orderNumber}
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Placed on{" "}
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span
              className={`rounded-full border px-4 py-2 text-xs capitalize ${getOrderStyle(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>

            <span
              className={`rounded-full border px-4 py-2 text-xs capitalize ${getPaymentStyle(
                order.paymentStatus
              )}`}
            >
              Payment {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Product */}
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
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
          >
            <div className="border-b border-white/10 p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Purchased Product
              </p>

              <h2 className="mt-3 text-xl font-medium">
                Product Details
              </h2>
            </div>

            <div className="p-6 md:p-8">
              {firstItem ? (
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <span className="text-xl font-semibold tracking-[-0.08em] text-white/20">
                        VT
                      </span>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                        Digital Product
                      </p>

                      <h3 className="mt-2 text-lg font-medium">
                        {firstItem.name}
                      </h3>

                      <p className="mt-2 text-sm text-white/35">
                        Quantity: {firstItem.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Price
                    </p>

                    <p className="mt-2 text-2xl font-medium">
                      ₹{firstItem.price}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white/40">
                  No product information available.
                </p>
              )}
            </div>
          </motion.section>

          {/* Summary */}
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
                Payment
              </p>

              <h2 className="mt-3 text-xl font-medium">
                Order Summary
              </h2>
            </div>

            <div className="p-6 md:p-8">
              <div className="space-y-5">
                <SummaryRow
                  label="Subtotal"
                  value={`₹${order.subtotal}`}
                />

                <SummaryRow
                  label="Discount"
                  value={`₹${order.discount}`}
                />

                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Total
                    </span>

                    <span className="text-2xl font-medium">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Status Timeline */}
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
            delay: 0.15,
          }}
          className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
        >
          <div className="border-b border-white/10 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Progress
            </p>

            <h2 className="mt-3 text-xl font-medium">
              Order Status
            </h2>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-4">
              <StatusStep
                number="01"
                title="Order Placed"
                description="Your order has been created."
                active={true}
              />

              <StatusStep
                number="02"
                title="Processing"
                description="Your order is being prepared."
                active={
                  order.orderStatus ===
                    "processing" ||
                  order.orderStatus ===
                    "completed"
                }
              />

              <StatusStep
                number="03"
                title="Completed"
                description="Your order is complete."
                active={
                  order.orderStatus ===
                  "completed"
                }
              />

              <StatusStep
                number="04"
                title="Download"
                description="Download access will appear here."
                active={
                  order.orderStatus ===
                  "completed"
                }
              />
            </div>

            {order.orderStatus ===
              "cancelled" && (
              <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-5">
                <p className="text-sm font-medium text-red-300">
                  This order has been cancelled.
                </p>
              </div>
            )}

            {order.orderStatus !==
              "completed" &&
              order.orderStatus !==
                "cancelled" && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-sm text-white/45">
                    Your order is currently{" "}
                    <span className="capitalize text-white/70">
                      {order.orderStatus}
                    </span>
                    . Download access will be
                    available after the order is
                    completed.
                  </p>
                </div>
              )}
          </div>
        </motion.section>

        {/* Information */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Order information */}
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
            className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Information
            </p>

            <h2 className="mt-3 text-xl font-medium">
              Order Information
            </h2>

            <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
              <InfoRow
                label="Order Number"
                value={order.orderNumber}
              />

              <InfoRow
                label="Order Date"
                value={formatDateTime(
                  order.createdAt
                )}
              />

              <InfoRow
                label="Payment"
                value={order.paymentStatus}
                capitalize
              />

              <InfoRow
                label="Status"
                value={order.orderStatus}
                capitalize
              />
            </div>
          </motion.section>

          {/* Support */}
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
              delay: 0.25,
            }}
            className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-8"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Need Help?
              </p>

              <h2 className="mt-3 text-xl font-medium">
                Have a question about your order?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/35">
                If you have any questions about
                payment, your order, or digital
                product access, get in touch with us.
              </p>
            </div>

            <Link
              href="/contact"
              className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition hover:bg-white/85"
            >
              Contact Venu Trinity
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.section>
        </div>

        {/* Footer action */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-white/25">
            Last updated{" "}
            {formatDateTime(order.updatedAt)}
          </p>

          <Link
            href="/dashboard/orders"
            className="text-xs text-white/40 transition hover:text-white"
          >
            ← Back to all orders
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-white/40">
        {label}
      </span>

      <span className="text-sm text-white/75">
        {value}
      </span>
    </div>
  );
}

function InfoRow({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <span className="text-sm text-white/35">
        {label}
      </span>

      <span
        className={`text-right text-sm text-white/70 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function StatusStep({
  number,
  title,
  description,
  active,
}: {
  number: string;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[10px] ${
            active
              ? "border-white bg-white text-black"
              : "border-white/10 bg-white/[0.03] text-white/20"
          }`}
        >
          {active ? "✓" : number}
        </div>

        <div>
          <p
            className={`text-sm ${
              active
                ? "text-white"
                : "text-white/30"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-white/25">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}