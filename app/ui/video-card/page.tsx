"use client";

import React from "react";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types/video";

const SAMPLE: Video = {
  rating: "4.5",
  id: "sample-1",
  title: "Sample Video",
  description: "A sample video.",
  thumbnail: "/api/placeholder/280/160",
  img: "/api/placeholder/280/160",
  duration: "180",
  views: 12345,
  uploadDate: new Date().toISOString(),
  category: "entertainment",
  channelId: "channel-1",
  accessType: "free",
  price: 0,
  isFree: true,
};

export default function VideoCardDemo() {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">VideoCard Demo</h2>
      <div className="w-64">
        <VideoCard video={SAMPLE} showActions={true} />
      </div>
    </div>
  );
}
