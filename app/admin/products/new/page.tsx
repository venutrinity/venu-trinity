"use client";

import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

type ProductFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileSize: number;
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

function getFileSize(size: number) {
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

export default function NewProductPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("PSD Files");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [files, setFiles] = useState<ProductFile[]>([]);
  const [status, setStatus] =
    useState<"draft" | "published">("draft");

  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleNameChange(value: string) {
    setName(value);

    if (!slug || slug === createSlug(name)) {
      setSlug(createSlug(value));
    }
  }

  function processFiles(selectedFiles: FileList | File[]) {
    const incomingFiles = Array.from(selectedFiles);

    if (incomingFiles.length === 0) {
      return;
    }

    const newFiles: ProductFile[] = incomingFiles.map(
      (file) => ({
        fileName: file.name,
        fileType: getFileExtension(file.name),
        fileUrl: "",
        fileSize: file.size,
      })
    );

    setFiles((currentFiles) => [
      ...currentFiles,
      ...newFiles,
    ]);
  }

  function handleFileSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files) {
      processFiles(event.target.files);
    }

    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragging(false);

    if (event.dataTransfer.files) {
      processFiles(event.dataTransfer.files);
    }
  }

  function removeFile(index: number) {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (_, fileIndex) => fileIndex !== index
      )
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (!slug.trim()) {
      alert("Please enter a product slug.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a product description.");
      return;
    }

    if (!price || Number(price) < 0) {
      alert("Please enter a valid price.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          category,
          description: description.trim(),
          price: Number(price),
          previewImage: previewImage.trim(),
          files,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to create product."
        );
        return;
      }

      alert("Product created successfully!");

      window.location.href =
        "/admin/products";
    } catch (error) {
      console.error(
        "Failed to create product:",
        error
      );

      alert(
        "Something went wrong while creating the product."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-zinc-500">
            Admin / Products / New
          </p>

          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Add Product
              </h1>

              <p className="mt-3 max-w-2xl text-zinc-500">
                Create a digital product for your
                Venu Trinity store.
              </p>
            </div>

            <div
              className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
                status === "published"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-zinc-200 text-zinc-700"
              }`}
            >
              {status === "published"
                ? "Published"
                : "Draft"}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFORMATION */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                The main information customers will see.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    handleNameChange(event.target.value)
                  }
                  placeholder="YouTube Thumbnail Pack"
                  required
                  className="w-full rounded-2xl border border-zinc-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      createSlug(event.target.value)
                    )
                  }
                  placeholder="youtube-thumbnail-pack"
                  required
                  className="w-full rounded-2xl border border-zinc-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5"
                />

                <p className="mt-2 text-xs text-zinc-400">
                  Automatically generated from the
                  product name.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 outline-none focus:border-black focus:ring-4 focus:ring-black/5"
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe what the customer receives..."
                  rows={7}
                  required
                  className="w-full resize-none rounded-2xl border border-zinc-300 px-4 py-3.5 outline-none focus:border-black focus:ring-4 focus:ring-black/5"
                />
              </div>

            </div>
          </section>

          {/* PRICING */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">
                Pricing
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Set the selling price of this product.
              </p>
            </div>

            <div className="max-w-md">
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  ₹
                </span>

                <input
                  type="number"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="499"
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-2xl border border-zinc-300 py-3.5 pl-9 pr-4 outline-none focus:border-black focus:ring-4 focus:ring-black/5"
                />
              </div>
            </div>
          </section>

          {/* PREVIEW IMAGE */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">
                Product Preview
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Add the main image customers will see.
              </p>
            </div>

            <label className="mb-2 block text-sm font-medium">
              Preview Image URL
            </label>

            <input
              type="url"
              value={previewImage}
              onChange={(event) =>
                setPreviewImage(event.target.value)
              }
              placeholder="https://..."
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3.5 outline-none focus:border-black focus:ring-4 focus:ring-black/5"
            />

            {previewImage && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100">
                <img
                  src={previewImage}
                  alt="Product preview"
                  className="max-h-[450px] w-full object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              </div>
            )}
          </section>

          {/* PRODUCT FILES */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">
                Product Files
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Upload the files customers will receive
                after purchase.
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
                  ? "border-black bg-zinc-100"
                  : "border-zinc-300 bg-zinc-50 hover:border-zinc-500 hover:bg-zinc-100"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-white">
                ↑
              </div>

              <h3 className="mt-5 text-base font-semibold">
                Drop files here or click to browse
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                PSD, JPG, PNG, PDF, ZIP, MP4 and other
                digital files
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Multiple files can be selected
              </p>
            </div>

            {/* Selected Files */}
            {files.length > 0 ? (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Selected Files
                  </p>

                  <p className="text-xs text-zinc-400">
                    {files.length}{" "}
                    {files.length === 1
                      ? "file"
                      : "files"}
                  </p>
                </div>

                {files.map((file, index) => (
                  <div
                    key={`${file.fileName}-${index}`}
                    className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
                  >
                    {/* File Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-xs font-bold text-zinc-700">
                      {file.fileType.slice(0, 4)}
                    </div>

                    {/* File Information */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {file.fileName}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
                        <span>
                          {file.fileType}
                        </span>

                        <span>
                          {getFileSize(
                            file.fileSize
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile(index);
                      }}
                      className="shrink-0 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-500">
                No product files selected yet.
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                Storage
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                Files are currently detected locally in
                the browser. Actual file storage will be
                connected in the next step.
              </p>
            </div>
          </section>

          {/* PUBLISHING */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">
                Publishing
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Decide whether customers can see this
                product.
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
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 outline-none focus:border-black focus:ring-4 focus:ring-black/5 md:max-w-md"
            >
              <option value="draft">
                Draft — Don't show publicly
              </option>

              <option value="published">
                Published — Show publicly
              </option>
            </select>
          </section>

          {/* ACTION */}
          <div className="flex justify-end pb-12">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {saving
                ? "Creating Product..."
                : "Create Product"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}