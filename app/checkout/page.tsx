"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  previewImage?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/products/${productId}`
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

    loadProduct();
  }, [productId]);

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch(
          "/api/auth/me"
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(
          "Failed to check authentication:",
          error
        );
      } finally {
        setUserLoading(false);
      }
    }

    checkUser();
  }, []);

  async function handleProceedToPayment() {
    if (!productId || !product) {
      setOrderError(
        "Product information is not available."
      );
      return;
    }

    setCreatingOrder(true);
    setOrderError("");

    try {
      const response = await fetch(
        "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setOrderError(
          data.message ||
            "Failed to create order"
        );
        return;
      }

      const message = `Hi Venu Trinity,

I want to purchase:
Product: ${product.name}
Order Number: ${data.order.orderNumber}
Amount: ₹${data.order.totalAmount}

Please confirm my order.`;

      const whatsappUrl =
        `https://wa.me/919849743774?text=` +
        encodeURIComponent(message);

      window.open(
        whatsappUrl,
        "_blank"
      );

      console.log(
        "Created order:",
        data.order
      );
    } catch (error) {
      console.error(
        "Failed to create order:",
        error
      );

      setOrderError(
        "Something went wrong. Please try again."
      );
    } finally {
      setCreatingOrder(false);
    }
  }

  if (loading || userLoading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black px-6 py-32 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-white/40">
              Loading checkout...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (!productId || !product) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black px-6 py-32 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Checkout
            </p>

            <h1 className="mt-5 text-4xl font-medium">
              Product not found
            </h1>

            <p className="mt-4 text-white/40">
              Please return to the digital products page.
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

  if (!user) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black px-6 py-32 text-white">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Checkout
            </p>

            <h1 className="mt-5 text-4xl font-medium tracking-tight">
              Login required
            </h1>

            <p className="mt-5 leading-7 text-white/40">
              Please login to your Venu Trinity account
              before purchasing this product.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/login?redirect=/checkout?product=${product._id}`}
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/85"
              >
                Login →
              </Link>

              <Link
                href={`/register?redirect=/checkout?product=${product._id}`}
                className="rounded-full border border-white/10 px-7 py-3 text-sm text-white/70 transition hover:border-white/25 hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const total = product.price;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section className="px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/digital-products/${product.slug}`}
              className="text-xs uppercase tracking-[0.25em] text-white/30 transition hover:text-white/60"
            >
              ← Back to Product
            </Link>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
              {/* Product Summary */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Order Summary
                </p>

                <div className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  <div className="aspect-[16/10] overflow-hidden bg-white/[0.03]">
                    {product.previewImage ? (
                      <img
                        src={product.previewImage}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-8xl font-semibold tracking-[-0.08em] text-white/10">
                          VT
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                      {product.category}
                    </p>

                    <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                      {product.name}
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-white/40">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Card */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Checkout
                </p>

                <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="border-b border-white/10 pb-6">
                    <p className="text-sm text-white/40">
                      Customer
                    </p>

                    <p className="mt-2 text-base">
                      {user.name}
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      {user.email}
                    </p>
                  </div>

                  <div className="border-b border-white/10 py-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/40">
                        Product
                      </span>

                      <span className="max-w-[180px] text-right text-sm">
                        {product.name}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-white/40">
                        Price
                      </span>

                      <span className="text-sm">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-6">
                    <span className="text-base font-medium">
                      Total
                    </span>

                    <span className="text-2xl font-semibold">
                      ₹{total}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    disabled={creatingOrder}
                    className="w-full rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {creatingOrder
                      ? "Creating Order..."
                      : "Proceed to Payment →"}
                  </button>

                  {orderError && (
                    <p className="mt-4 text-center text-sm text-red-400">
                      {orderError}
                    </p>
                  )}

                  <p className="mt-4 text-center text-xs leading-5 text-white/25">
                    Payment will be completed through WhatsApp
                    for now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />

          <main className="min-h-screen bg-black px-6 py-32 text-white">
            <div className="mx-auto max-w-7xl">
              <p className="text-white/40">
                Loading checkout...
              </p>
            </div>
          </main>
        </>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}