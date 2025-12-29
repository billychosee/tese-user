import React from "react";
import Link from "next/link";

const components = [
  "carousel",
  "category-row",
  "creators-list",
  "navbar",
  "paywall-modal",
  "subscription-button",
  "theme-test",
  "theme-toggle",
  "video-card",
];

export default function UIIndex() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-6 text-2xl font-bold">UI Components Showcase</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {components.map((c) => (
          <Link
            key={c}
            href={`/ui/${c}`}
            className="p-4 border rounded-lg bg-zimbabwe-white/5 hover:bg-zimbabwe-white/10"
          >
            {c}
          </Link>
        ))}
      </div>
    </div>
  );
}
