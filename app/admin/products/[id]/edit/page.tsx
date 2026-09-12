"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ProductFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
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

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("PSD Files");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [files, setFiles] = useState<ProductFile[]>([]);
  const [status, setStatus] =
    useState<"draft" | "published">("draft");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to load product");
        }

        const data = await response.json();

        setProduct(data.product);
        setName(data.product.name);
        setSlug(data.product.slug);
        setCategory(data.product.category);
        setDescription(data.product.description);
        setPrice(String(data.product.price));
        setPreviewImage(data.product.previewImage || "");
        setFiles(data.product.files || []);
        setStatus(data.product.status);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "File upload failed");
        return;
      }

      setFiles((currentFiles) => [
        ...currentFiles,
        data.file,
      ]);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Something went wrong while uploading the file");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          category,
          description,
          price,
          previewImage,
          files,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update product");
        return;
      }

      alert("Product updated successfully!");

      window.location.href = "/admin/products";
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Something went wrong");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Product not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-sm text-gray-500">
            Admin / Products / Edit
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            Edit Product
          </h1>

          <p className="mt-2 text-gray-500">
            Update your digital product.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
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
                setSlug(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option>PSD Files</option>
              <option>Design Templates</option>
              <option>Website Templates</option>
              <option>Documents</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={6}
              required
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              min="0"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Files
            </label>

            <input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              accept=".psd,.zip,.pdf"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

            {uploading && (
              <p className="mt-2 text-sm text-gray-500">
                Uploading file...
              </p>
            )}

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.fileUrl}-${index}`}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <p className="font-medium">
                      {file.fileName}
                    </p>

                    <p className="mt-1 break-all text-sm text-gray-500">
                      {file.fileUrl}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "draft"
                    | "published"
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">
                Published
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            Update Product
          </button>
        </form>
      </div>
    </main>
  );
}