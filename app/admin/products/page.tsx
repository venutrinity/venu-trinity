"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  status: "draft" | "published";
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/admin/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      alert("Product deleted successfully!");

      setProducts((currentProducts) =>
        currentProducts.filter(
          (item) => item._id !== product._id
        )
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Something went wrong");
    }
  }

  async function handleToggleStatus(product: Product) {
  const newStatus =
    product.status === "published"
      ? "draft"
      : "published";

  try {
    const response = await fetch(
      `/api/products/${product._id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update product status");
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item._id === product._id
          ? { ...item, status: newStatus }
          : item
      )
    );

    alert(
      newStatus === "published"
        ? "Product published successfully!"
        : "Product unpublished successfully!"
    );
  } catch (error) {
    console.error(
      "Failed to update product status:",
      error
    );

    alert("Something went wrong");
  }
}

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold">
              Products
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your digital products.
            </p>
          </div>

          <a
            href="/admin/products/new"
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            Add Product
          </a>
        </div>

        {/* Products */}
        <div className="mt-10">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 p-10 text-center">
              <h2 className="text-xl font-medium">
                No products yet
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first digital product.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="divide-y divide-gray-200">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between gap-6 p-5"
                  >
                    {/* Product Information */}
                    <div>
                      <h2 className="font-medium">
                        {product.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>

                    {/* Price + Status + Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{product.price}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.status}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Publish / Unpublish */}
                        <button
                          onClick={() =>
                            handleToggleStatus(product)
                          }
                          className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                        >
                          {product.status === "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        {/* Edit */}
                        <a
                          href={`/admin/products/${product._id}/edit`}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                          Edit
                        </a>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(product)
                          }
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}