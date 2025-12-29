"use client";

import React, { useState } from "react";
import PaywallModal from "@/components/PaywallModal";

export default function PaywallModalDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">PaywallModal Demo</h2>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 mb-4 rounded bg-zimbabwe-red"
      >
        Open
      </button>
      <PaywallModal
        isOpen={open}
        onClose={() => setOpen(false)}
        videoTitle="Sample Video"
        price={19}
        onPurchase={() => {}}
      />
    </div>
  );
}
