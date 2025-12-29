"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function RequestPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const title =
    (searchParams && (searchParams.title as string)) ||
    (searchParams && (searchParams.topic as string)) ||
    (searchParams && (searchParams.category as string)) ||
    (searchParams && (searchParams.video as string)) ||
    "Requested Content";

  const image =
    (searchParams && (searchParams.image as string)) ||
    "/api/placeholder/1200/600";

  return (
    <div className="min-h-screen text-gray-100 bg-gray-900">
      <div className="relative overflow-hidden">
        <div
          className="w-full h-64 bg-center bg-cover sm:h-80"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={String(title)}
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

        <div className="absolute left-6 top-16 sm:left-12 sm:top-28">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">
            {decodeURIComponent(String(title))}
          </h1>
          <p className="max-w-xl mt-3 text-sm text-gray-300">
            This content has been requested. When it becomes available it will
            appear here — subscribe to be notified.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() =>
                alert(
                  "We will notify you when this content is available (demo)"
                )
              }
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-black bg-yellow-400 rounded-md shadow-sm hover:bg-yellow-500"
            >
              Notify Me
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl px-6 py-12 mx-auto">
        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="mb-3 text-lg font-semibold">About this request</h2>
              <p className="text-sm text-gray-300">
                We don't have this clip yet. This placeholder helps the team
                know which content users want most. If you'd like to help
                prioritize, use the Notify button above.
              </p>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-gray-200">
                  Details
                </h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>
                    Requested title:{" "}
                    <span className="text-gray-200">
                      {decodeURIComponent(String(title))}
                    </span>
                  </li>
                  <li>Requested via: Dashboard link</li>
                  <li>Visibility: Public</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="hidden md:block">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="mb-2 text-sm font-semibold">Related actions</h4>
              <button
                onClick={() => alert("Thanks — your interest is noted (demo)")}
                className="w-full px-3 py-2 mb-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Upvote Request
              </button>
              <button
                onClick={() => router.push("/ui")}
                className="w-full px-3 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                Browse UI Demos
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
