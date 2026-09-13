"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";

type ProductFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
};

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  previewImage?: string;
  files?: ProductFile[];
  status: "draft" | "published";
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/products/${slug}`
        );

        const data = await response.json();

        if (response.ok) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black px-6 py-32 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-white/40">
              Loading product...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black px-6 py-32 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Digital Products
            </p>

            <h1 className="mt-5 text-4xl font-medium">
              Product not found
            </h1>

            <p className="mt-4 text-white/40">
              This product may no longer be available.
            </p>

            <Link
              href="/digital-products"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
            >
              ← Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* Product Hero */}
        <section className="px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Link
                href="/digital-products"
                className="text-xs uppercase tracking-[0.25em] text-white/30 transition hover:text-white/60"
              >
                ← Digital Products
              </Link>
            </Reveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
              {/* Preview */}
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  <div className="aspect-[4/3] overflow-hidden">
                    {product.previewImage ? (
                      <img
                        src={product.previewImage}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="relative flex h-full items-center justify-center bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
                        <div className="text-center">
                          <div className="text-8xl font-semibold tracking-[-0.08em] text-white/10 md:text-[10rem]">
                            VT
                          </div>

                          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/20">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Product Information */}
              <Reveal delay={0.1}>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                    {product.category}
                  </p>

                  <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                    {product.name}
                  </h1>

                  <p className="mt-6 text-base leading-8 text-white/45 md:text-lg">
                    {product.description}
                  </p>

                  <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                      Price
                    </p>

                    <p className="mt-2 text-4xl font-semibold">
                      ₹{product.price}
                    </p>
                  </div>

                <Link
                    href={`/checkout?product=${product._id}`}
                    className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/85 sm:w-auto"
                    >
                    Buy Now →
                </Link>

                  <p className="mt-4 text-xs text-white/25">
                    Secure checkout coming soon.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-2">
              <Reveal>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                    About this product
                  </p>

                  <h2 className="mt-5 text-3xl font-medium tracking-tight md:text-4xl">
                    Built for creators.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
                    {product.description}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                    Product Information
                  </p>

                  <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center justify-between py-5">
                      <span className="text-sm text-white/40">
                        Category
                      </span>

                      <span className="text-sm">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-5">
                      <span className="text-sm text-white/40">
                        Format
                      </span>

                      <span className="text-sm">
                        Digital Download
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-5">
                      <span className="text-sm text-white/40">
                        Price
                      </span>

                      <span className="text-sm">
                        ₹{product.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-5">
                      <span className="text-sm text-white/40">
                        Files
                      </span>

                      <span className="text-sm">
                        {product.files?.length || 0} file
                        {product.files?.length === 1
                          ? ""
                          : "s"}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Ready to create?
                </p>

                <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
                  Get the tools.
                  <br />
                  <span className="text-white/35">
                    Start creating.
                  </span>
                </h2>

                <Link
                    href={`/checkout?product=${product._id}`}
                    className="mt-10 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                >
                Buy {product.name} →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}