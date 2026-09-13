"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function DigitalProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          const publishedProducts = data.products
            .filter(
              (product: Product) =>
                product.status === "published"
            )
            .slice(0, 3);

          setProducts(publishedProducts);
        }
      } catch (error) {
        console.error(
          "Digital products loading failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-[-15%] top-1/4 h-[550px] w-[550px] rounded-full bg-white/[0.025] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 flex flex-col gap-8 md:mb-24 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                Digital Products
              </p>
            </div>

            <h2 className="max-w-5xl text-4xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
              Tools to help you
              <br />
              <span className="text-white/25">
                create better.
              </span>
            </h2>
          </div>

          <div className="max-w-sm lg:pb-2">
            <p className="text-sm leading-6 text-white/30">
              Premium templates, resources, and digital products
              built for creators, designers, and modern businesses.
            </p>

            <Link
              href="/digital-products"
              className="group mt-6 inline-flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-white"
            >
              <span className="border-b border-white/15 pb-1 group-hover:border-white/50">
                Explore all products
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
              >
                <div className="aspect-[4/3] animate-pulse bg-white/[0.04]" />

                <div className="space-y-4 p-6">
                  <div className="h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-10 w-full animate-pulse rounded bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-12 text-center">
            <p className="text-sm text-white/35">
              Digital products coming soon.
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/digital-products/${product.slug}`}
                  className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  {/* Preview */}
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-[#090909]">
                    {product.previewImage ? (
                      <img
                        src={product.previewImage}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent" />

                        <div className="absolute inset-0 opacity-[0.18]">
                          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{
                              scale: 1.08,
                              rotate: 3,
                            }}
                            className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                          >
                            <span className="text-2xl font-semibold tracking-[-0.08em] text-white/20">
                              VT
                            </span>
                          </motion.div>
                        </div>
                      </>
                    )}

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Category */}
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-md">
                        {product.category}
                      </span>
                    </div>

                    {/* Number */}
                    <div className="absolute bottom-5 left-5">
                      <span className="text-[9px] tracking-[0.25em] text-white/35">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/20 text-sm text-white/50 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 md:p-7">
                    <h3 className="text-xl font-medium tracking-[-0.03em] text-white/80 transition-colors duration-300 group-hover:text-white md:text-2xl">
                      {product.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/30">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="text-lg font-medium text-white">
                        ₹{product.price}
                      </span>

                      <span className="text-xs text-white/35 transition-colors duration-300 group-hover:text-white/70">
                        View Product →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}