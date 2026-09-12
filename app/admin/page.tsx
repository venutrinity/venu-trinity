"use client";

import { useEffect, useState } from "react";

type AdminUser = {
  userId: string;
  role: "customer" | "admin";
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const response = await fetch("/api/admin/test");

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (response.status === 403) {
          window.location.href = "/dashboard";
          return;
        }

        if (!response.ok) {
          throw new Error("Admin check failed");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Admin authentication failed:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Checking admin access...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to the Venu Trinity administration panel.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">
              Products
            </p>

            <p className="mt-2 text-3xl font-semibold">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">
              Orders
            </p>

            <p className="mt-2 text-3xl font-semibold">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">
              Customers
            </p>

            <p className="mt-2 text-3xl font-semibold">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">
              Revenue
            </p>

            <p className="mt-2 text-3xl font-semibold">
              ₹0
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">
            Logged in as
          </p>

          <p className="mt-2 font-medium">
            {user.role}
          </p>
        </div>
      </div>
    </main>
  );
}