"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  previewImage?: string;
  status: "draft" | "published";
};

export default function DigitalProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
                Digital Products
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Tools to
                <br />
                <span className="text-white/35">
                  create better.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-base leading-8 text-white/45 md:text-lg">
                Premium digital products, templates, resources, and courses
                built to help creators, designers, and businesses work faster.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Products */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* Loading */}
            {loading && (
              <div className="py-20 text-center">
                <p className="text-sm text-white/40">
                  Loading products...
                </p>
              </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
              <Reveal>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                    Store
                  </p>

                  <h2 className="mt-5 text-3xl font-medium">
                    No products available yet.
                  </h2>

                  <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/40">
                    New digital products will appear here once they are
                    published from the admin panel.
                  </p>
                </div>
              </Reveal>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {products.map((product, index) => (
                  <Reveal key={product._id} delay={index * 0.08}>
                    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-500 hover:border-white/20">
                      {/* Product Preview */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
                        {product.previewImage ? (
                          <img
                            src={product.previewImage}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 opacity-20">
                              <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center transition duration-500 group-hover:scale-110">
                                <div className="text-6xl font-semibold tracking-[-0.08em] text-white/15 md:text-8xl">
                                  VT
                                </div>

                                <p className="mt-3 text-[9px] uppercase tracking-[0.4em] text-white/15">
                                  {product.category}
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        <span className="absolute left-5 top-5 text-xs tracking-[0.3em] text-white/30">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/50 backdrop-blur-md">
                          ₹{product.price}
                        </span>
                      </div>

                      {/* Product Info */}
                      <div className="p-6 md:p-8">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                          {product.category}
                        </p>

                        <h2 className="mt-4 text-2xl font-medium tracking-tight">
                          {product.name}
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                          {product.description}
                        </p>

                        <Link
                          href={`/digital-products/${product.slug}`}
                          className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-xs text-white/60 transition hover:border-white/25 hover:text-white"
                        >
                          View Product

                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            ↗
                          </span>
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Future Store */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Coming Soon
                </p>

                <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
                  A complete digital
                  <br />
                  <span className="text-white/35">
                    creator marketplace.
                  </span>
                </h2>

                <p className="mt-7 max-w-2xl text-base leading-8 text-white/40">
                  Venu Trinity will evolve into a digital marketplace where
                  creators can discover premium templates, resources, courses,
                  and tools in one place.
                </p>

                <Link
                  href="/#contact"
                  className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                >
                  Get Notified →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}