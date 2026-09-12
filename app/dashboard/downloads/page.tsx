"use client";

import { useEffect, useState } from "react";

type DownloadFile = {
  fileName: string;
  fileType: string;
  fileUrl: string;
};

type Download = {
  id: string;
  productName: string;
  files: DownloadFile[];
  purchasedAt: string;
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDownloads() {
      try {
        const response = await fetch("/api/downloads");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setDownloads(data.downloads || []);
      } catch (error) {
        console.error("Failed to load downloads:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDownloads();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading downloads...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold">
          My Downloads
        </h1>

        <p className="mt-2 text-gray-500">
          Access your purchased digital products.
        </p>

        {downloads.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-medium">
              No downloads yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your purchased files will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {downloads.map((download) => (
              <div
                key={download.id}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <div>
                  <h2 className="text-xl font-medium">
                    {download.productName}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Purchased{" "}
                    {new Date(
                      download.purchasedAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {download.files.map((file) => (
                    <div
                      key={`${download.id}-${file.fileName}`}
                      className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {file.fileName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {file.fileType}
                        </p>
                      </div>

                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-black px-5 py-3 text-sm text-white"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}