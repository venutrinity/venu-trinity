"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;

    product: {
      name: string;
      slug: string;
      category: string;
      previewImage: string;
    } | null;
  }[];

  subtotal: number;
  discount: number;
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

  paymentId?: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminOrderDetailsPage() {
  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingPayment, setUpdatingPayment] =
    useState(false);

  const [updatingOrder, setUpdatingOrder] =
    useState(false);

  const [updateMessage, setUpdateMessage] =
    useState("");

  const [updateError, setUpdateError] =
    useState("");

  useEffect(() => {
    async function loadOrder() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/orders/${encodeURIComponent(
            id
          )}/details`,
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
            data.message || "Failed to load order"
          );
        }

        setOrder(data.order);
      } catch (error) {
        console.error(
          "Failed to load order:",
          error
        );

        setError(
          "Unable to load order details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const paymentClasses = (
    status: Order["paymentStatus"]
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
    status: Order["orderStatus"]
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

  // --------------------------------------------------
  // UPDATE PAYMENT STATUS
  // --------------------------------------------------

  async function updatePaymentStatus(
    paymentStatus: Order["paymentStatus"]
  ) {
    if (!order || updatingPayment) return;

    try {
      setUpdatingPayment(true);
      setUpdateMessage("");
      setUpdateError("");

      const response = await fetch(
        `/api/admin/orders/${order.id}/payment`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update payment status"
        );
      }

      setOrder((current) =>
        current
          ? {
              ...current,
              paymentStatus:
                data.order.paymentStatus,
            }
          : current
      );

      setUpdateMessage(
        "Payment status updated successfully."
      );
    } catch (error) {
      console.error(
        "Payment status update failed:",
        error
      );

      setUpdateError(
        error instanceof Error
          ? error.message
          : "Failed to update payment status."
      );
    } finally {
      setUpdatingPayment(false);
    }
  }

  // --------------------------------------------------
  // UPDATE ORDER STATUS
  // --------------------------------------------------

  async function updateOrderStatus(
    orderStatus: Order["orderStatus"]
  ) {
    if (!order || updatingOrder) return;

    try {
      setUpdatingOrder(true);
      setUpdateMessage("");
      setUpdateError("");

      const response = await fetch(
        `/api/admin/orders/${order.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update order status"
        );
      }

      setOrder((current) =>
        current
          ? {
              ...current,
              orderStatus:
                data.order.orderStatus,
            }
          : current
      );

      setUpdateMessage(
        "Order status updated successfully."
      );
    } catch (error) {
      console.error(
        "Order status update failed:",
        error
      );

      setUpdateError(
        error instanceof Error
          ? error.message
          : "Failed to update order status."
      );
    } finally {
      setUpdatingOrder(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-3 w-40 rounded bg-white/10" />

            <div className="mt-5 h-12 w-72 rounded bg-white/10" />

            <div className="mt-3 h-4 w-56 rounded bg-white/5" />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <div className="h-56 rounded-[1.5rem] bg-white/[0.025]" />
              <div className="h-56 rounded-[1.5rem] bg-white/[0.025] lg:col-span-2" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm text-red-400">
              {error || "Order not found."}
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition hover:bg-white hover:text-black"
          >
            ← Back to Orders
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
              Order Details
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-sm text-white/40">
                {order.orderNumber}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="text-xs text-white/25">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>

          <Link
            href="/admin/orders"
            className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
          >
            <span>←</span>
            Back to Orders
          </Link>
        </div>

        {/* UPDATE MESSAGE */}

        {(updateMessage || updateError) && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`mt-6 rounded-2xl border p-4 text-sm ${
              updateError
                ? "border-red-500/20 bg-red-500/5 text-red-400"
                : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
            }`}
          >
            {updateError || updateMessage}
          </motion.div>
        )}

        {/* TOP SUMMARY */}

        <div className="mt-10 grid gap-4 lg:grid-cols-3">

          {/* CUSTOMER */}

          <motion.section
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
            }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Customer
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-medium">
                {order.customer.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-medium">
                  {order.customer.name}
                </h2>

                <p className="mt-1 truncate text-xs text-white/35">
                  {order.customer.email}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-white/[0.07] pt-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Email
                </p>

                <p className="mt-2 break-all text-sm text-white/65">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Phone
                </p>

                <p className="mt-2 text-sm text-white/65">
                  {order.customer.phone ||
                    "Not provided"}
                </p>
              </div>
            </div>
          </motion.section>

          {/* STATUS MANAGEMENT */}

          <motion.section
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
              delay: 0.08,
            }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 lg:col-span-2"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                  Order Management
                </p>

                <h2 className="mt-2 text-xl font-medium tracking-[-0.03em]">
                  Status Control
                </h2>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Admin Only
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* PAYMENT STATUS */}

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                    Payment
                  </p>

                  <span
                    className={`rounded-full border px-3 py-1 text-[9px] capitalize ${paymentClasses(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-xs text-white/40">
                    Change payment status
                  </span>

                  <select
                    value={order.paymentStatus}
                    disabled={updatingPayment}
                    onChange={(event) =>
                      updatePaymentStatus(
                        event.target
                          .value as Order["paymentStatus"]
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option
                      value="pending"
                      className="bg-[#111111]"
                    >
                      Pending
                    </option>

                    <option
                      value="paid"
                      className="bg-[#111111]"
                    >
                      Paid
                    </option>

                    <option
                      value="failed"
                      className="bg-[#111111]"
                    >
                      Failed
                    </option>

                    <option
                      value="refunded"
                      className="bg-[#111111]"
                    >
                      Refunded
                    </option>
                  </select>
                </label>

                {updatingPayment && (
                  <p className="mt-3 text-[10px] text-white/30">
                    Updating payment status...
                  </p>
                )}
              </div>

              {/* ORDER STATUS */}

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                    Order
                  </p>

                  <span
                    className={`rounded-full border px-3 py-1 text-[9px] capitalize ${orderClasses(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-xs text-white/40">
                    Change order status
                  </span>

                  <select
                    value={order.orderStatus}
                    disabled={updatingOrder}
                    onChange={(event) =>
                      updateOrderStatus(
                        event.target
                          .value as Order["orderStatus"]
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option
                      value="pending"
                      className="bg-[#111111]"
                    >
                      Pending
                    </option>

                    <option
                      value="processing"
                      className="bg-[#111111]"
                    >
                      Processing
                    </option>

                    <option
                      value="completed"
                      className="bg-[#111111]"
                    >
                      Completed
                    </option>

                    <option
                      value="cancelled"
                      className="bg-[#111111]"
                    >
                      Cancelled
                    </option>
                  </select>
                </label>

                {updatingOrder && (
                  <p className="mt-3 text-[10px] text-white/30">
                    Updating order status...
                  </p>
                )}
              </div>
            </div>

            {/* TOTAL */}

            <div className="mt-4 rounded-2xl border border-white/[0.07] bg-black/20 p-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Total Amount
              </p>

              <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
          </motion.section>
        </div>

        {/* PRODUCTS */}

        <motion.section
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
            delay: 0.16,
          }}
          className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025]"
        >
          <div className="border-b border-white/[0.07] p-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Order Contents
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.03em]">
              Products
            </h2>
          </div>

          <div className="divide-y divide-white/[0.07]">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">

                  {item.product?.previewImage ? (
                    <img
                      src={item.product.previewImage}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white/20">
                      VT
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-white/30">
                      {item.product?.category ||
                        "Digital Product"}
                    </p>

                    <p className="mt-2 text-xs text-white/25">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-base font-medium">
                    {formatCurrency(
                      item.price * item.quantity
                    )}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    {formatCurrency(item.price)} ×{" "}
                    {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SUMMARY + INFORMATION */}

        <div className="mt-4 grid gap-4 lg:grid-cols-2">

          {/* SUMMARY */}

          <motion.section
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
              delay: 0.22,
            }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Financial
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.03em]">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">
                  Subtotal
                </span>

                <span className="text-sm text-white/75">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">
                  Discount
                </span>

                <span className="text-sm text-white/75">
                  - {formatCurrency(order.discount)}
                </span>
              </div>

              <div className="border-t border-white/[0.07] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">
                    Total
                  </span>

                  <span className="text-2xl font-medium tracking-[-0.03em]">
                    {formatCurrency(
                      order.totalAmount
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* INFORMATION */}

          <motion.section
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
              delay: 0.28,
            }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Metadata
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.03em]">
              Order Information
            </h2>

            <div className="mt-7 space-y-5">

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Order Date
                </p>

                <p className="mt-2 text-sm text-white/65">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Last Updated
                </p>

                <p className="mt-2 text-sm text-white/65">
                  {formatDate(order.updatedAt)}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Payment ID
                </p>

                <p className="mt-2 break-all text-xs text-white/35">
                  {order.paymentId ||
                    "Not available"}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Order ID
                </p>

                <p className="mt-2 break-all text-xs text-white/35">
                  {order.id}
                </p>
              </div>

            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}