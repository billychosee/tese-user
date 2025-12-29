"use client";

import React from "react";
import CategoryRow from "@/components/CategoryRow";

export default function CategoryRowDemo() {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">CategoryRow Demo</h2>
      <CategoryRow title="Popular" videos={[]} />
    </div>
  );
}
