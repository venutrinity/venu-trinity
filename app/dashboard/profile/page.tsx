"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  avatar?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load profile:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your Venu Trinity account details.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 text-lg font-medium">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 text-lg font-medium">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-1 text-lg font-medium">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-1 text-lg font-medium">
                {user.phone || "Not added yet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}