"use client";

import React from "react";
import Navbar from "@/components/Navbar";

export default function NavbarDemo() {
  return (
    <div>
      <Navbar user={{ name: "Demo User", email: "demo@example.com" }} />
      <div className="p-8">Navbar is rendered above.</div>
    </div>
  );
}
