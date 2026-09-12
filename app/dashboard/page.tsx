"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

export default function DashboardPage() {
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


  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Authentication check failed:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">
          Welcome, {user.name}
        </h1>

        <p className="mt-3 text-gray-500">
          {user.email}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Role: {user.role}
        </p>
        <button
            onClick={handleLogout}
            className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
        >
        Logout
        </button>
      </div>
    </main>
  );
}