"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
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
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        const authResponse = await fetch("/api/auth/me");

        if (!authResponse.ok) {
          window.location.href = "/login";
          return;
        }

        const authData = await authResponse.json();

        setUser(authData.user);

        const ordersResponse = await fetch("/api/orders");

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();

          setOrders(ordersData.orders || []);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );
      } finally {
        setLoading(false);
        setOrdersLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
          <p className="text-sm text-white/40">
            Loading dashboard...
          </p>
        </main>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Customer Dashboard
                </p>

                <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
                  Welcome, {user.name}
                </h1>

                <p className="mt-4 text-sm text-white/40">
                  Manage your orders, downloads and account.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/70 transition hover:border-white/25 hover:text-white"
              >
                Logout
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Orders
                </p>

                <p className="mt-4 text-4xl font-semibold">
                  {orders.length}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Paid Orders
                </p>

                <p className="mt-4 text-4xl font-semibold">
                  {
                    orders.filter(
                      (order) =>
                        order.paymentStatus === "paid"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Downloads
                </p>

                <p className="mt-4 text-4xl font-semibold">
                  0
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Courses
                </p>

                <p className="mt-4 text-4xl font-semibold">
                  0
                </p>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">

              {/* Account */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Account
                </p>

                <div className="mt-8">
                  <p className="text-sm text-white/40">
                    Name
                  </p>

                  <p className="mt-2 text-base">
                    {user.name}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-white/40">
                    Email
                  </p>

                  <p className="mt-2 break-all text-base">
                    {user.email}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-white/40">
                    Account Type
                  </p>

                  <p className="mt-2 capitalize text-base">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* My Orders */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                      My Orders
                    </p>

                    <h2 className="mt-3 text-2xl font-medium">
                      Order History
                    </h2>
                  </div>

                  <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40">
                    {orders.length} Orders
                  </span>
                </div>

                <div className="mt-8">
                  {ordersLoading ? (
                    <p className="text-sm text-white/30">
                      Loading orders...
                    </p>
                  ) : orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                      <p className="text-sm text-white/40">
                        You don't have any orders yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="rounded-2xl border border-white/10 bg-black/30 p-5"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                                Order
                              </p>

                              <p className="mt-2 text-sm font-medium">
                                {order.orderNumber}
                              </p>

                              <p className="mt-2 text-xs text-white/30">
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>

                            <div className="sm:text-right">
                              <p className="text-lg font-semibold">
                                ₹{order.totalAmount}
                              </p>

                              <div className="mt-2 flex gap-2 sm:justify-end">
                                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
                                  {order.paymentStatus}
                                </span>

                                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
                                  {order.orderStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Downloads
                </p>

                <h3 className="mt-4 text-xl font-medium">
                  My Downloads
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Purchased digital files will appear here.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Learning
                </p>

                <h3 className="mt-4 text-xl font-medium">
                  My Courses
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Your purchased courses and lessons will
                  appear here.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Profile
                </p>

                <h3 className="mt-4 text-xl font-medium">
                  Account Settings
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Profile and account settings will be
                  available here.
                </p>
              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}