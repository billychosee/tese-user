"use client";

import React from "react";
import Carousel from "@/components/Carousel";

export default function CarouselDemo() {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">Carousel Demo</h2>
      <Carousel title="Sample Carousel">
        <div className="w-60 h-36 rounded-lg bg-zimbabwe-white/10" />
        <div className="w-60 h-36 rounded-lg bg-zimbabwe-white/20" />
        <div className="w-60 h-36 rounded-lg bg-zimbabwe-white/30" />
      </Carousel>
    </div>
  );
}
