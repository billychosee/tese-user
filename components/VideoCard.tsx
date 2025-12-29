"use client";

import { Video, VideoAccessType } from "@/types/video";
import { formatDuration, formatViews, getCategoryColor } from "@/lib/utils";
import { ACCESS_TYPE_COLORS, COLORS } from "@/lib/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { userApi } from "@/lib/api";

interface VideoCardProps {
  video: Video;
  onClick?: (video: Video) => void;
  showChannel?: boolean;
  showActions?: boolean;
}

export default function VideoCard({
  video,
  onClick,
  showChannel = true,
  showActions = false,
}: VideoCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(video);
      return;
    }
    router.push(`/watch/${video.id}`);
  };

  const getAccessTypeBadge = (accessType: VideoAccessType, price?: number) => {
    switch (accessType) {
      case "free":
        return (
          <span
            className={`category-badge ${ACCESS_TYPE_COLORS.free} ${COLORS.zimbabwe.white}`}
          >
            Free
          </span>
        );
      case "pay-per-view":
        return (
          <span
            className={`price-badge ${ACCESS_TYPE_COLORS["pay-per-view"]} ${COLORS.zimbabwe.white}`}
          >
            R{price || 0}
          </span>
        );
      case "subscriber-only":
        return (
          <span
            className={`subscription-badge ${ACCESS_TYPE_COLORS["subscriber-only"]} ${COLORS.zimbabwe.white}`}
          >
            Subscribers Only
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="transition-all duration-200 cursor-pointer bg-zimbabwe-grey-charcoal video-card hover:bg-zimbabwe-grey-charcoal/80"
      onClick={handleCardClick}
    >
      {/* Video Thumbnail */}
      <div className="relative video-thumbnail group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/api/placeholder/280/160";
          }}
        />
        <div className="video-duration">{formatDuration(video.duration)}</div>

        {/* Access Type Overlay */}
        <div className="absolute top-2 left-2">
          {getAccessTypeBadge(video.accessType, video.price)}
        </div>
      </div>

      {/* Video Info */}
      <div className="video-info">
        <h3 className="video-title line-clamp-2">{video.title}</h3>

        {showChannel && (
          <div className="video-meta">
            <span className="text-zimbabwe-white/60 video-channel">
              {video.channelId}
            </span>
            <span className="text-zimbabwe-white/60">
              {formatViews(video.views)}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span
            className={`category-badge ${getCategoryColor(video.category)}`}
          >
            {video.category}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(video.uploadDate).toLocaleDateString()}
          </span>
        </div>

        {showActions && (
          <div className="mt-3 video-actions">
            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (isProcessing) return;
                // If pay-per-view, attempt purchase first
                if (video.accessType === "pay-per-view") {
                  if (!isAuthenticated) {
                    router.push("/");
                    return;
                  }
                  setIsProcessing(true);
                  const res = await userApi.purchaseVideo(video.id);
                  setIsProcessing(false);
                  if (!res.success) {
                    // simple alert for now
                    alert(res.error || "Purchase failed");
                    return;
                  }
                }
                router.push(`/watch/${video.id}`);
              }}
              className={`action-button primary ${ACCESS_TYPE_COLORS["pay-per-view"]} hover:${ACCESS_TYPE_COLORS["pay-per-view"]}/90`}
            >
              {isProcessing ? "Processing..." : "Watch Now"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add to a simple local queue
                const raw = localStorage.getItem("watch_queue");
                let queue: string[] = raw ? JSON.parse(raw) : [];
                if (!queue.includes(video.id)) {
                  queue.unshift(video.id);
                  localStorage.setItem("watch_queue", JSON.stringify(queue.slice(0, 50)));
                }
                // optional visual feedback
                alert("Added to queue");
              }}
              className={`action-button ${ACCESS_TYPE_COLORS.free} hover:${ACCESS_TYPE_COLORS.free}/90`}
            >
              Add to Queue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

