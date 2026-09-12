"use client";

import { useEffect, useState } from "react";

type Invoice = {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  status: string;
  issuedAt: string;
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      try {
        const response = await fetch("/api/invoices");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (error) {
        console.error("Failed to load invoices:", error);
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading billing...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold">
          Billing & Invoices
        </h1>

        <p className="mt-2 text-gray-500">
          View your payment history and invoices.
        </p>

        {invoices.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-medium">
              No invoices yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your invoices will appear here after a purchase.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Invoice
                    </p>

                    <p className="font-medium">
                      {invoice.invoiceNumber}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{invoice.totalAmount}
                  </p>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <span>
                    Status:{" "}
                    <strong>{invoice.status}</strong>
                  </span>

                  <span className="text-gray-500">
                    {new Date(
                      invoice.issuedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}