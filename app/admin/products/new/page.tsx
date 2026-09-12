"use client";

import { FormEvent, useState } from "react";

type ProductFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
  publicId?: string;
};

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("PSD Files");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [files, setFiles] = useState<ProductFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] =
    useState<"draft" | "published">("draft");

  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setUploading(true);

    try {
      // Step 1: Get secure signature from our server
      const signatureResponse = await fetch(
        "/api/cloudinary/sign",
        {
          method: "POST",
        }
      );

      const signatureData = await signatureResponse.json();

      if (!signatureResponse.ok) {
        alert(
          signatureData.message ||
            "Failed to create upload signature"
        );
        return;
      }

      // Step 2: Prepare direct Cloudinary upload
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append(
        "api_key",
        signatureData.apiKey
      );
      formData.append(
        "timestamp",
        String(signatureData.timestamp)
      );
      formData.append(
        "signature",
        signatureData.signature
      );
      formData.append(
        "folder",
        "venu-trinity/products"
      );

      // Step 3: Upload directly to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        console.error(
          "Cloudinary upload error:",
          uploadData
        );

        alert(
          uploadData.error?.message ||
            "File upload failed"
        );
        return;
      }

      // Step 4: Save uploaded file information
      const uploadedFile: ProductFile = {
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileUrl: uploadData.secure_url,
        publicId: uploadData.public_id,
      };

      setFiles((currentFiles) => [
        ...currentFiles,
        uploadedFile,
      ]);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error(
        "File upload failed:",
        error
      );

      alert(
        "Something went wrong while uploading the file"
      );
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
      const response = await fetch("/api/products", {
        method: "POST",
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
        alert(
          data.message ||
            "Failed to create product"
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

      alert("Something went wrong");
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-sm text-gray-500">
            Admin / Products
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            Add Product
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new digital product for your
            store.
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
              placeholder="Example: YouTube Thumbnail Pack"
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
              placeholder="youtube-thumbnail-pack"
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
              placeholder="Describe your product..."
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
              placeholder="499"
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
              accept=".psd,.zip,.pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />

            {uploading && (
              <p className="mt-2 text-sm text-gray-500">
                Uploading directly to Cloudinary...
              </p>
            )}

            {files.length > 0 && (
              <div className="mt-4 space-y-3">
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
            Create Product
          </button>
        </form>
      </div>
    </main>
  );
}