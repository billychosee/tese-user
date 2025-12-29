"use client";

import React from "react";
import CreatorsList from "@/components/CreatorsList";
import { Channel } from "@/types/channel";

const MOCK: Channel[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `channel-${i + 1}`,
  name: `Creator ${i + 1}`,
  description: `This is creator ${i + 1}`,
  avatar: `https://placehold.co/80x80/667eea/fff?text=C${i + 1}`,
  banner: "",
  subscriberCount: Math.floor(Math.random() * 100000),
  isSubscribed: false,
  subscriptionPrice: 49,
  videos: [],
}));

export default function CreatorsListDemo() {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">CreatorsList Demo</h2>
      <CreatorsList creators={MOCK} />
    </div>
  );
}
