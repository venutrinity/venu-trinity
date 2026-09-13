"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const categories = [
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Digital Marketing",
  "Branding",
];

type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  client?: string;
  tools: string[];
  images: string[];
  status: "draft" | "published";
};

export default function EditPortfolioProjectPage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [project, setProject] =
    useState<PortfolioProject | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] =
    useState("Graphic Design");
  const [description, setDescription] =
    useState("");
  const [client, setClient] = useState("");
  const [tools, setTools] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "draft" | "published"
  >("draft");

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] =
    useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Portfolio project ID is missing.");
      setLoading(false);
      return;
    }

    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/portfolio/${id}`,
          {
            method: "GET",
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
              "Failed to load project"
          );
        }

        if (!data.project) {
          throw new Error(
            "Project data was not returned"
          );
        }

        const loadedProject =
          data.project as PortfolioProject;

        setProject(loadedProject);

        setTitle(loadedProject.title || "");
        setSlug(loadedProject.slug || "");
        setCategory(
          loadedProject.category ||
            "Graphic Design"
        );
        setDescription(
          loadedProject.description || ""
        );
        setClient(
          loadedProject.client || ""
        );
        setTools(
          Array.isArray(loadedProject.tools)
            ? loadedProject.tools.join(", ")
            : ""
        );
        setImages(
          Array.isArray(loadedProject.images)
            ? loadedProject.images
            : []
        );
        setStatus(
          loadedProject.status ===
            "published"
            ? "published"
            : "draft"
        );
      } catch (error) {
        console.error(
          "Failed to load project:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load project"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function compressImage(
    file: File
  ): Promise<File> {
    const image = new Image();
    const objectUrl =
      URL.createObjectURL(file);

    try {
      await new Promise<void>(
        (resolve, reject) => {
          image.onload = () => resolve();

          image.onerror = () =>
            reject(
              new Error(
                "Could not read image"
              )
            );

          image.src = objectUrl;
        }
      );

      const maxWidth = 2400;
      const maxHeight = 2400;

      let width = image.naturalWidth;
      let height = image.naturalHeight;

      if (
        width > maxWidth ||
        height > maxHeight
      ) {
        const widthRatio =
          maxWidth / width;

        const heightRatio =
          maxHeight / height;

        const ratio = Math.min(
          widthRatio,
          heightRatio
        );

        width = Math.round(
          width * ratio
        );

        height = Math.round(
          height * ratio
        );
      }

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width = width;
      canvas.height = height;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Could not prepare image for upload"
        );
      }

      context.drawImage(
        image,
        0,
        0,
        width,
        height
      );

      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/webp",
              0.82
            );
          }
        );

      if (!blob) {
        throw new Error(
          "Could not compress image"
        );
      }

      return new File(
        [blob],
        `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}.webp`,
        {
          type: "image/webp",
        }
      );
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setUploadingImage(true);
    setError("");
    setMessage("");

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error(
          "Please select an image file."
        );
      }

      const compressedFile =
        await compressImage(file);

      console.log(
        "Original image size:",
        (
          file.size /
          1024 /
          1024
        ).toFixed(2),
        "MB"
      );

      console.log(
        "Compressed image size:",
        (
          compressedFile.size /
          1024 /
          1024
        ).toFixed(2),
        "MB"
      );

      const formData =
        new FormData();

      formData.append(
        "file",
        compressedFile
      );

      const response =
        await fetch(
          "/api/admin/portfolio/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (response.status === 401) {
        window.location.href =
          "/login";
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
            "Image upload failed"
        );
      }

      if (!data.imageUrl) {
        throw new Error(
          "Cloudinary image URL was not returned"
        );
      }

      setImages((currentImages) => [
        ...currentImages,
        data.imageUrl,
      ]);

      setMessage(
        "Image uploaded successfully."
      );

      event.target.value = "";
    } catch (error) {
      console.error(
        "Failed to upload image:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );

      event.target.value = "";
    } finally {
      setUploadingImage(false);
    }
  }

  function removeImage(index: number) {
    setImages((currentImages) =>
      currentImages.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );

    setMessage("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!id) {
      setError(
        "Portfolio project ID is missing."
      );
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response =
        await fetch(
          `/api/admin/portfolio/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              title: title.trim(),
              slug: slug.trim(),
              category,
              description:
                description.trim(),
              client: client.trim(),
              tools: tools
                .split(",")
                .map((tool) =>
                  tool.trim()
                )
                .filter(Boolean),
              images,
              status,
            }),
          }
        );

      const data =
        await response.json();

      if (response.status === 401) {
        window.location.href =
          "/login";
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
            "Failed to update project"
        );
      }

      setProject(data.project);

      setMessage(
        "Portfolio project updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update project:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update project"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading project...
        </p>
      </main>
    );
  }

  if (error && !project) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>

          <Link
            href="/admin/portfolio"
            className="mt-6 inline-flex rounded-xl border border-gray-200 px-5 py-3 text-sm"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Edit Portfolio Project
          </h1>

          <p className="mt-2 text-gray-500">
            Update your portfolio project.
          </p>
        </div>

        {/* Success */}

        {message && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm text-green-700">
              {message}
            </p>
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {/* Basic Information */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold">
              Basic Information
            </h2>

            <div className="mt-6 space-y-5">
              {/* Title */}

              <div>
                <label className="text-sm font-medium">
                  Project Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setTitle(value);

                    if (!slug) {
                      setSlug(
                        createSlug(value)
                      );
                    }
                  }}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Slug */}

              <div>
                <label className="text-sm font-medium">
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
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Used for the project URL.
                </p>
              </div>

              {/* Category */}

              <div>
                <label className="text-sm font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-black"
                >
                  {categories.map(
                    (categoryName) => (
                      <option
                        key={categoryName}
                        value={
                          categoryName
                        }
                      >
                        {categoryName}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Description */}

              <div>
                <label className="text-sm font-medium">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={5}
                  required
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Client */}

              <div>
                <label className="text-sm font-medium">
                  Client
                </label>

                <input
                  type="text"
                  value={client}
                  onChange={(event) =>
                    setClient(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />
              </div>
            </div>
          </section>

          {/* Tools */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold">
              Tools Used
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Separate multiple tools with commas.
            </p>

            <input
              type="text"
              value={tools}
              onChange={(event) =>
                setTools(
                  event.target.value
                )
              }
              placeholder="Photoshop, Illustrator, After Effects"
              className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </section>

          {/* Project Images */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Project Images
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Upload project images directly
                  to Cloudinary.
                </p>
              </div>

              <label
                className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:opacity-80 ${
                  uploadingImage
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                {uploadingImage
                  ? "Uploading..."
                  : "Choose Image"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageUpload
                  }
                  disabled={
                    uploadingImage
                  }
                  className="hidden"
                />
              </label>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Large images are automatically
              resized and converted to WebP.
            </p>

            {/* Uploaded Images */}

            {images.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {images.map(
                  (image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                    >
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={`Project image ${
                            index + 1
                          }`}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <p className="truncate text-xs text-gray-400">
                          Image{" "}
                          {index + 1}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="mt-3 rounded-lg border border-red-200 px-4 py-2 text-xs text-red-600 transition hover:bg-red-50"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-10 text-center">
                <p className="text-sm text-gray-500">
                  No project images uploaded yet.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Choose an image above to add one.
                </p>
              </div>
            )}
          </section>

          {/* Publishing */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold">
              Publishing
            </h2>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "draft"
                    | "published"
                )
              }
              className="mt-5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-black"
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </section>

          {/* Actions */}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Link
              href="/admin/portfolio"
              className="inline-flex justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm transition hover:bg-gray-50"
            >
              ← Back to Portfolio
            </Link>

            <button
              type="submit"
              disabled={
                saving ||
                uploadingImage
              }
              className="rounded-xl bg-black px-6 py-3 text-sm text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}