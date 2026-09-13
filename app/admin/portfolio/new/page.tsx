"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Graphic Design",
  "Video Editing",
  "Web Development",
  "Digital Marketing",
  "Branding",
];

type ProjectStatus = "draft" | "published";

export default function NewPortfolioProjectPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] =
    useState("Graphic Design");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [tools, setTools] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [status, setStatus] =
    useState<ProjectStatus>("draft");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /*
   * ADMIN AUTH CHECK
   *
   * Not logged in -> Login
   * Customer -> Dashboard
   * Admin -> Continue
   */
  useEffect(() => {
    let mounted = true;

    async function checkAdminAccess() {
      try {
        const response = await fetch(
          "/api/auth/me",
          {
            credentials: "include",
            cache: "no-store",
          }
        );

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
          setCheckingAuth(false);
        }
      } catch (error) {
        console.error(
          "Failed to verify admin access:",
          error
        );

        router.replace("/login");
      }
    }

    checkAdminAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slug) {
      setSlug(createSlug(value));
    }
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
        document.createElement("canvas");

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
        [
          blob,
        ],
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

    if (!file) {
      return;
    }

    setUploadingImage(true);
    setError("");
    setMessage("");

    try {
      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        throw new Error(
          "Please select an image file."
        );
      }

      const maxFileSize =
        20 * 1024 * 1024;

      if (file.size > maxFileSize) {
        throw new Error(
          "Image must be smaller than 20 MB."
        );
      }

      const compressedFile =
        await compressImage(file);

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
            credentials: "include",
            body: formData,
          }
        );

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        router.replace("/dashboard");
        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload image"
        );
      }

      if (!data.imageUrl) {
        throw new Error(
          "Upload completed but no image URL was returned."
        );
      }

      setImages(
        (currentImages) => [
          ...currentImages,
          data.imageUrl,
        ]
      );

      setMessage(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "Failed to upload portfolio image:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload image"
      );
    } finally {
      setUploadingImage(false);

      event.target.value = "";
    }
  }

  function removeImage(
    index: number
  ) {
    setImages(
      (currentImages) =>
        currentImages.filter(
          (_, imageIndex) =>
            imageIndex !== index
        )
    );
  }

  function resetForm() {
    setTitle("");
    setSlug("");
    setCategory("Graphic Design");
    setDescription("");
    setClient("");
    setTools("");
    setImages([]);
    setStatus("draft");
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setMessage("");
  setError("");

  const cleanTitle = title.trim();
  const cleanSlug = createSlug(slug);
  const cleanDescription =
    description.trim();
  const cleanClient = client.trim();

  if (!cleanTitle) {
    setError(
      "Please enter a project title."
    );
    return;
  }

  if (!cleanSlug) {
    setError(
      "Please enter a valid project slug."
    );
    return;
  }

  if (!cleanDescription) {
    setError(
      "Please enter a project description."
    );
    return;
  }

  if (!category) {
    setError(
      "Please select a project category."
    );
    return;
  }

  setSaving(true);

  try {
    const response = await fetch(
      "/api/admin/portfolio",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: cleanTitle,
          slug: cleanSlug,
          category,
          description:
            cleanDescription,
          client: cleanClient,
          tools: tools
            .split(",")
            .map((tool) => tool.trim())
            .filter(Boolean),
          images,
          status,
        }),
      }
    );

    if (response.status === 401) {
      router.replace("/login");
      return;
    }

    if (response.status === 403) {
      router.replace("/dashboard");
      return;
    }

    const data = await response.json();

    /*
     * DUPLICATE SLUG
     */
    if (response.status === 409) {
      const baseSlug = cleanSlug;

      let suggestedSlug =
        `${baseSlug}-2`;

      /*
       * If the same slug is already
       * being used, suggest -2.
       */
      setError(
        `This slug already exists. Try "${suggestedSlug}".`
      );

      setSlug(suggestedSlug);

      return;
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to create project"
      );
    }

    /*
     * SUCCESS
     */

    setTitle("");
    setSlug("");
    setCategory("Graphic Design");
    setDescription("");
    setClient("");
    setTools("");
    setImages([]);
    setStatus("draft");

    setMessage(
      "Portfolio project created successfully."
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.error(
      "Failed to create portfolio project:",
      error
    );

    setError(
      error instanceof Error
        ? error.message
        : "Failed to create project"
    );
  } finally {
    setSaving(false);
  }
}
  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="h-3 w-28 rounded-full bg-white/10" />

            <div className="mt-6 h-12 w-80 rounded-xl bg-white/10" />

            <div className="mt-3 h-5 w-96 max-w-full rounded-full bg-white/5" />

            <div className="mt-10 space-y-4">
              <div className="h-28 rounded-3xl bg-white/5" />
              <div className="h-28 rounded-3xl bg-white/5" />
              <div className="h-28 rounded-3xl bg-white/5" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">

        {/* TOP BACK BUTTON */}

        <Link
          href="/admin/portfolio"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
        >
          ← Back to Portfolio
        </Link>

        {/* HEADER */}

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Add Portfolio Project
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Add a new project to your
            Venu Trinity portfolio and
            organize it by category.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-xs text-emerald-300">
                ✓
              </div>

              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Project Created Successfully
                </p>

                <p className="mt-1 text-xs text-emerald-300/50">
                  Your portfolio project has
                  been saved successfully.
                </p>
              </div>
            </div>

            {/* SUCCESS ACTIONS */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/admin/portfolio"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                View Portfolio →
              </Link>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                + Create Another Project
              </button>

            </div>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* BASIC INFORMATION */}

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Basic Information
              </h2>

              <p className="mt-2 text-sm text-white/35">
                Define the main details of
                your project.
              </p>
            </div>

            <div className="mt-8 space-y-6">

              {/* TITLE */}

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">
                  Project Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    handleTitleChange(
                      event.target.value
                    )
                  }
                  placeholder="Cinematic Travel Video"
                  required
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/30"
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">
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
                  placeholder="cinematic-travel-video"
                  required
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/30"
                />

                <p className="mt-2 text-xs text-white/25">
                  URL: /portfolio/
                  {slug ||
                    "project-slug"}
                </p>
              </div>

              {/* CATEGORY */}

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
                >
                  {categories.map(
                    (categoryName) => (
                      <option
                        key={
                          categoryName
                        }
                        value={
                          categoryName
                        }
                      >
                        {categoryName}
                      </option>
                    )
                  )}
                </select>

                <p className="mt-2 text-xs text-white/25">
                  Select Video Editing
                  for video editing
                  projects.
                </p>
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe the project, creative direction and work delivered..."
                  rows={6}
                  required
                  className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/30"
                />
              </div>

              {/* CLIENT */}

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">
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
                  placeholder="Personal Project"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/30"
                />
              </div>

            </div>
          </section>

          {/* TOOLS */}

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              02
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Tools Used
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Separate multiple tools
              with commas.
            </p>

            <input
              type="text"
              value={tools}
              onChange={(event) =>
                setTools(
                  event.target.value
                )
              }
              placeholder="Premiere Pro, After Effects, Photoshop"
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-white/30"
            />

            <p className="mt-3 text-xs text-white/25">
              Example: Premiere Pro,
              After Effects
            </p>
          </section>

          {/* IMAGES */}

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              03
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Project Images
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Upload project images.
              Images are automatically
              resized and converted to
              WebP before upload.
            </p>

            {/* UPLOAD */}

            <div className="mt-6">

              <label
                className={`inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition ${
                  uploadingImage
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-white/90"
                }`}
              >
                {uploadingImage
                  ? "Optimizing & Uploading..."
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

              <p className="mt-3 text-xs text-white/25">
                Maximum original file
                size: 20 MB.
              </p>
            </div>

            {/* UPLOADED IMAGES */}

            {images.length > 0 && (
              <div className="mt-8 space-y-3">

                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Uploaded Images
                  </p>

                  <span className="text-xs text-white/25">
                    {images.length}{" "}
                    image
                    {images.length !==
                    1
                      ? "s"
                      : ""}
                  </span>
                </div>

                {images.map(
                  (image, index) => (
                    <div
                      key={image}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                    >
                      <img
                        src={image}
                        alt={`Project image ${
                          index + 1
                        }`}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-white/40">
                          Image{" "}
                          {index + 1}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-white/20">
                          {image}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            index
                          )
                        }
                        className="rounded-full border border-red-400/20 px-3 py-2 text-xs text-red-300/70 transition hover:bg-red-400/10 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* PUBLISHING */}

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              04
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Publishing
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Choose whether the project
              should be visible publicly.
            </p>

            <div className="mt-6">

              <label className="text-xs uppercase tracking-[0.15em] text-white/40">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target
                      .value as ProjectStatus
                  )
                }
                className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>

              <p className="mt-3 text-xs text-white/25">
                Draft projects should remain
                hidden from the public
                portfolio.
              </p>
            </div>
          </section>

          {/* BOTTOM ACTIONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">

            <Link
              href="/admin/portfolio"
              className="inline-flex justify-center rounded-full border border-white/10 px-6 py-3.5 text-sm text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
            >
              ← Back to Portfolio
            </Link>

            <button
              type="submit"
              disabled={
                saving ||
                uploadingImage
              }
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving
                ? "Creating Project..."
                : "Create Project"}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}