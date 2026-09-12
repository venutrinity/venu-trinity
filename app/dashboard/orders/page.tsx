"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View your Venu Trinity purchases and order status.
        </p>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-medium">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your purchases will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order
                    </p>

                    <p className="font-medium">
                      {order.orderNumber}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <div className="mt-5 flex gap-6 text-sm">
                  <p>
                    Payment:{" "}
                    <span className="font-medium">
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p>
                    Status:{" "}
                    <span className="font-medium">
                      {order.orderStatus}
                    </span>
                  </p>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}