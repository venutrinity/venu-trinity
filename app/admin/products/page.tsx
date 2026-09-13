"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  status: "draft" | "published";
};

type Filter = "all" | "published" | "draft";

export default function AdminProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkAdmin() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.user) {
          router.replace("/login");
          return;
        }

        if (data.user.role !== "admin") {
          router.replace("/dashboard");
          return;
        }

        if (mounted) {
          await loadProducts();
        }
      } catch (error) {
        console.error(
          "Admin authentication check failed:",
          error
        );

        if (mounted) {
          setError("Unable to verify admin access.");
          setLoading(false);
        }
      }
    }

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function loadProducts() {
    try {
      setError("");

      const response = await fetch("/api/admin/products", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        router.replace("/dashboard");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(product: Product) {
    const newStatus =
      product.status === "published"
        ? "draft"
        : "published";

    setActionLoading(product._id);

    try {
      const response = await fetch(
        `/api/products/${product._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        router.replace("/dashboard");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update product status"
        );
      }

      setProducts((currentProducts) =>
        currentProducts.map((item) =>
          item._id === product._id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to update product status:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update product status"
      );
    } finally {
      setActionLoading("");
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(product._id);

    try {
      const response = await fetch(
        `/api/products/${product._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        router.replace("/dashboard");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (item) => item._id !== product._id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete product:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete product"
      );
    } finally {
      setActionLoading("");
    }
  }

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        product.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const publishedCount = products.filter(
    (product) => product.status === "published"
  ).length;

  const draftCount = products.filter(
    (product) => product.status === "draft"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-3 w-24 rounded-full bg-white/10" />

            <div className="mt-5 h-12 w-64 rounded-xl bg-white/10" />

            <div className="mt-3 h-5 w-80 rounded-full bg-white/5" />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="h-32 rounded-3xl bg-white/5" />
              <div className="h-32 rounded-3xl bg-white/5" />
              <div className="h-32 rounded-3xl bg-white/5" />
            </div>

            <div className="mt-8 h-20 rounded-3xl bg-white/5" />

            <div className="mt-5 h-32 rounded-3xl bg-white/5" />
            <div className="mt-3 h-32 rounded-3xl bg-white/5" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Administration
            </p>

            <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Products
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Manage your digital products, pricing,
              publishing status and store content.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
          >
            <span>Add Product</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>

        {error && (
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                loadProducts();
              }}
              className="mt-4 rounded-full border border-red-400/20 px-4 py-2 text-xs text-red-200 transition hover:bg-red-500/10"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Total Products
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em]">
              {products.length}
            </p>

            <p className="mt-2 text-xs text-white/30">
              All products in your store
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300/50">
              Published
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em] text-emerald-200">
              {publishedCount}
            </p>

            <p className="mt-2 text-xs text-white/30">
              Currently visible in store
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Drafts
            </p>

            <p className="mt-5 text-4xl font-medium tracking-[-0.04em]">
              {draftCount}
            </p>

            <p className="mt-2 text-xs text-white/30">
              Products waiting to publish
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
              placeholder="Search products..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-white/20 focus:bg-white/[0.05]"
            />
          </div>

          <div className="flex w-fit items-center rounded-full border border-white/10 bg-white/[0.025] p-1">
            {[
              {
                value: "all" as Filter,
                label: "All",
              },
              {
                value: "published" as Filter,
                label: "Published",
              },
              {
                value: "draft" as Filter,
                label: "Draft",
              },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-4 py-2 text-xs transition-all duration-300 ${
                  filter === item.value
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white/30">
                +
              </div>

              <h2 className="mt-5 text-lg font-medium">
                {products.length === 0
                  ? "No products yet"
                  : "No matching products"}
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/35">
                {products.length === 0
                  ? "Create your first digital product and it will appear here."
                  : "Try another search term or change the filter."}
              </p>

              {products.length === 0 && (
                <Link
                  href="/admin/products/new"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-xs font-medium text-black transition hover:bg-white/90"
                >
                  Create Product
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:block">
                <div className="grid grid-cols-[1fr_160px_130px_250px] border-b border-white/10 px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-white/25">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Status</span>
                  <span className="text-right">
                    Actions
                  </span>
                </div>

                <div className="divide-y divide-white/[0.07]">
                  {filteredProducts.map((product) => {
                    const isLoading =
                      actionLoading === product._id;

                    return (
                      <div
                        key={product._id}
                        className="grid grid-cols-[1fr_160px_130px_250px] items-center px-6 py-5 transition-colors duration-300 hover:bg-white/[0.025]"
                      >
                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-medium text-white">
                            {product.name}
                          </h2>

                          <p className="mt-1 text-xs text-white/30">
                            {product.category}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            ₹
                            {product.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>

                        <div>
                          <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] ${
                              product.status ===
                              "published"
                                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                : "border-white/10 bg-white/[0.04] text-white/40"
                            }`}
                          >
                            {product.status ===
                            "published"
                              ? "Live"
                              : "Draft"}
                          </span>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              handleToggleStatus(
                                product
                              )
                            }
                            className="rounded-full border border-white/10 px-3.5 py-2 text-[10px] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {isLoading
                              ? "..."
                              : product.status ===
                                "published"
                              ? "Unpublish"
                              : "Publish"}
                          </button>

                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="rounded-full border border-white/10 px-3.5 py-2 text-[10px] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              handleDelete(product)
                            }
                            className="rounded-full border border-red-400/10 px-3.5 py-2 text-[10px] text-red-300/60 transition-all duration-300 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 md:hidden">
                {filteredProducts.map((product) => {
                  const isLoading =
                    actionLoading === product._id;

                  return (
                    <div
                      key={product._id}
                      className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-medium">
                            {product.name}
                          </h2>

                          <p className="mt-1 text-xs text-white/30">
                            {product.category}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] ${
                            product.status ===
                            "published"
                              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                              : "border-white/10 bg-white/[0.04] text-white/40"
                          }`}
                        >
                          {product.status ===
                          "published"
                            ? "Live"
                            : "Draft"}
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                          Price
                        </p>

                        <p className="mt-1 text-xl font-medium">
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() =>
                            handleToggleStatus(
                              product
                            )
                          }
                          className="rounded-xl border border-white/10 px-3 py-2.5 text-[10px] text-white/50 transition hover:bg-white hover:text-black disabled:opacity-40"
                        >
                          {isLoading
                            ? "..."
                            : product.status ===
                              "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="rounded-xl border border-white/10 px-3 py-2.5 text-center text-[10px] text-white/50 transition hover:bg-white hover:text-black"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() =>
                            handleDelete(product)
                          }
                          className="rounded-xl border border-red-400/10 px-3 py-2.5 text-[10px] text-red-300/60 transition hover:bg-red-400/10 hover:text-red-200 disabled:opacity-40"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/20">
            <span>
              Showing {filteredProducts.length} of{" "}
              {products.length}
            </span>

            <span>Venu Trinity Store</span>
          </div>
        )}
      </div>
    </main>
  );
}