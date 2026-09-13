"use client";

import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type ProductFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileSize?: number;
  publicId?: string;
};

type Product = {
  _id: string;
  name: string;
  slug: string;
  category:
    | "PSD Files"
    | "Design Templates"
    | "Website Templates"
    | "Documents"
    | "Other";
  description: string;
  price: number;
  previewImage?: string;
  files?: ProductFile[];
  status: "draft" | "published";
};

const categories = [
  "PSD Files",
  "Design Templates",
  "Website Templates",
  "Documents",
  "Other",
];

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getFileExtension(fileName: string) {
  const parts = fileName.split(".");

  if (parts.length < 2) {
    return "FILE";
  }

  return parts[parts.length - 1].toUpperCase();
}

function getFileSize(size?: number) {
  if (!size) {
    return "Storage file";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function EditProductPage() {
  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] =
    useState("PSD Files");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] =
    useState("");
  const [files, setFiles] =
    useState<ProductFile[]>([]);
  const [status, setStatus] =
    useState<"draft" | "published">("draft");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setError("");

        const response = await fetch(
          `/api/products/${id}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (response.status === 403) {
          window.location.href = "/dashboard";
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load product."
          );
        }

        if (!data.product) {
          throw new Error("Product not found.");
        }

        const loadedProduct =
          data.product as Product;

        setProduct(loadedProduct);

        setName(loadedProduct.name || "");
        setSlug(loadedProduct.slug || "");
        setCategory(
          loadedProduct.category ||
            "PSD Files"
        );
        setDescription(
          loadedProduct.description || ""
        );
        setPrice(
          String(loadedProduct.price ?? "")
        );
        setPreviewImage(
          loadedProduct.previewImage || ""
        );
        setFiles(
          Array.isArray(loadedProduct.files)
            ? loadedProduct.files
            : []
        );
        setStatus(
          loadedProduct.status ===
            "published"
            ? "published"
            : "draft"
        );
      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function handleNameChange(value: string) {
    const previousSlug = createSlug(name);

    setName(value);

    if (!slug || slug === previousSlug) {
      setSlug(createSlug(value));
    }
  }

  function processFiles(
    selectedFiles: FileList | File[]
  ) {
    const incomingFiles =
      Array.from(selectedFiles);

    if (incomingFiles.length === 0) {
      return;
    }

    const newFiles: ProductFile[] =
      incomingFiles.map((file) => ({
        fileName: file.name,
        fileType: getFileExtension(
          file.name
        ),
        fileUrl: "",
        fileSize: file.size,
      }));

    setFiles((currentFiles) => [
      ...currentFiles,
      ...newFiles,
    ]);

    setMessage(
      `${incomingFiles.length} file${
        incomingFiles.length === 1
          ? ""
          : "s"
      } added to the product.`
    );

    setError("");
  }

  function handleFileSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files) {
      processFiles(event.target.files);
    }

    event.target.value = "";
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setIsDragging(false);

    if (event.dataTransfer.files) {
      processFiles(
        event.dataTransfer.files
      );
    }
  }

  function removeFile(index: number) {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );

    setMessage("File removed.");
    setError("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!id) {
      setError("Product ID is missing.");
      return;
    }

    if (!name.trim()) {
      setError(
        "Please enter a product name."
      );
      return;
    }

    if (!slug.trim()) {
      setError(
        "Please enter a product slug."
      );
      return;
    }

    if (!description.trim()) {
      setError(
        "Please enter a product description."
      );
      return;
    }

    if (
      price === "" ||
      Number(price) < 0 ||
      Number.isNaN(Number(price))
    ) {
      setError("Please enter a valid price.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.trim(),
            slug: slug.trim(),
            category,
            description:
              description.trim(),
            price: Number(price),
            previewImage:
              previewImage.trim(),
            files,
            status,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (response.status === 403) {
        window.location.href =
          "/dashboard";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update product."
        );
      }

      if (data.product) {
        setProduct(data.product);
      }

      setMessage(
        "Product updated successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Failed to update product:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the product."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-3 w-40 rounded-full bg-white/10" />

          <div className="mt-5 h-12 w-72 rounded-xl bg-white/10" />

          <div className="mt-3 h-5 w-96 max-w-full rounded-full bg-white/5" />

          <div className="mt-10 space-y-6">
            <div className="h-64 rounded-3xl bg-white/5" />
            <div className="h-40 rounded-3xl bg-white/5" />
            <div className="h-64 rounded-3xl bg-white/5" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Administration / Products
          </p>

          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em]">
            Product not found
          </h1>

          {error && (
            <div className="mt-6 rounded-3xl border border-red-400/20 bg-red-500/5 p-5">
              <p className="text-sm text-red-300">
                {error}
              </p>
            </div>
          )}

          <Link
            href="/admin/products"
            className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30 transition hover:text-white"
          >
            ← Products
          </Link>

          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Administration / Products / Edit
              </p>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Edit Product
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                Update your digital product,
                pricing, preview and publishing
                settings.
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] ${
                status === "published"
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 bg-white/[0.04] text-white/40"
              }`}
            >
              {status === "published"
                ? "Published"
                : "Draft"}
            </span>
          </div>
        </div>

        {/* Success */}
        {message && (
          <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5">
            <p className="text-sm text-emerald-300">
              {message}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-3xl border border-red-400/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Basic Information */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-white/35">
                Update the information customers
                see.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Name */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-medium text-white/70">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    handleNameChange(
                      event.target.value
                    )
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/25 focus:bg-white/[0.06]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">
                  Slug
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      createSlug(
                        event.target.value
                      )
                    )
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25 focus:bg-white/[0.06]"
                />

                <p className="mt-2 text-[11px] text-white/25">
                  Used in the product URL.
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25"
                >
                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-medium text-white/70">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={7}
                  required
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm leading-6 text-white outline-none transition focus:border-white/25 focus:bg-white/[0.06]"
                />

                <p className="mt-2 text-[11px] text-white/25">
                  Explain what the customer
                  receives and what the product
                  is useful for.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                02
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Pricing
              </h2>

              <p className="mt-1 text-sm text-white/35">
                Set the selling price.
              </p>
            </div>

            <div className="max-w-md">
              <label className="mb-2 block text-xs font-medium text-white/70">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">
                  ₹
                </span>

                <input
                  type="number"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      event.target.value
                    )
                  }
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-9 pr-4 text-sm text-white outline-none transition focus:border-white/25 focus:bg-white/[0.06]"
                />
              </div>
            </div>
          </section>

          {/* Preview */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                03
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Product Preview
              </h2>

              <p className="mt-1 text-sm text-white/35">
                Update the main product image
                customers will see.
              </p>
            </div>

            <label className="mb-2 block text-xs font-medium text-white/70">
              Preview Image URL
            </label>

            <input
              type="url"
              value={previewImage}
              onChange={(event) =>
                setPreviewImage(
                  event.target.value
                )
              }
              placeholder="https://..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/25 focus:bg-white/[0.06]"
            />

            {previewImage && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black">
                <img
                  src={previewImage}
                  alt={name}
                  className="max-h-[450px] w-full object-contain"
                  onError={(event) => {
                    event.currentTarget.style.opacity =
                      "0.2";
                  }}
                />
              </div>
            )}
          </section>

          {/* Product Files */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                04
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Product Files
              </h2>

              <p className="mt-1 text-sm text-white/35">
                Manage the digital files associated
                with this product.
              </p>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() =>
                setIsDragging(false)
              }
              onDrop={handleDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className={`cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
                isDragging
                  ? "border-white/50 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl text-black">
                ↑
              </div>

              <h3 className="mt-5 text-base font-medium">
                Drop files here or click to browse
              </h3>

              <p className="mt-2 text-sm text-white/35">
                PSD, JPG, PNG, PDF, ZIP, MP4 and
                other digital files
              </p>

              <p className="mt-1 text-xs text-white/20">
                Multiple files supported
              </p>
            </div>

            {/* Files */}
            {files.length > 0 ? (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Attached Files
                  </p>

                  <p className="text-xs text-white/25">
                    {files.length}{" "}
                    {files.length === 1
                      ? "file"
                      : "files"}
                  </p>
                </div>

                {files.map(
                  (file, index) => (
                    <div
                      key={`${file.fileName}-${index}`}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[10px] font-bold text-white/60">
                        {file.fileType.slice(
                          0,
                          4
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {file.fileName}
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/30">
                          <span>
                            {file.fileType}
                          </span>

                          <span>
                            {getFileSize(
                              file.fileSize
                            )}
                          </span>
                        </div>

                        {file.fileUrl ? (
                          <p className="mt-1 truncate text-xs text-emerald-300/60">
                            Stored file
                          </p>
                        ) : (
                          <p className="mt-1 truncate text-xs text-amber-300/60">
                            Storage pending
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeFile(index);
                        }}
                        className="shrink-0 rounded-xl border border-red-400/10 px-3 py-2 text-xs text-red-300/60 transition hover:bg-red-400/10 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-sm text-white/30">
                No product files added.
              </div>
            )}

            {/* Storage Notice */}
            <div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-4">
              <p className="text-sm font-medium text-amber-200">
                Storage
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-200/50">
                New files are currently detected
                locally. Actual file storage and
                customer downloads will be connected
                after hosting and storage are
                finalized.
              </p>
            </div>
          </section>

          {/* Publishing */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                05
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Publishing
              </h2>

              <p className="mt-1 text-sm text-white/35">
                Control whether customers can see
                this product.
              </p>
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "draft"
                    | "published"
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25 md:max-w-md"
            >
              <option value="draft">
                Draft — Don't show publicly
              </option>

              <option value="published">
                Published — Show publicly
              </option>
            </select>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3 pb-12 sm:flex-row sm:justify-end">
            <Link
              href="/admin/products"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-center text-sm font-medium text-white/60 transition hover:bg-white/[0.08] hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-white px-8 py-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}