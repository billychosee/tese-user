import { VideoCategory } from "@/types/video";
import { CATEGORY_COLORS } from "./colors";

export function formatDuration(duration: string): string {
  // Convert duration from seconds to MM:SS format
  const seconds = parseInt(duration);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
}

export function getCategoryColor(category: VideoCategory): string {
  return CATEGORY_COLORS[category] || "bg-zimbabwe-gray-600";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateVideoThumbnail(title: string): string {
  // Generate a placeholder thumbnail based on video title
  const colors = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#f5576c",
    "#4facfe",
    "#00f2fe",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return `https://placehold.co/280x160/${color.replace(
    "#",
    ""
  )}/white?text=${encodeURIComponent(title.substring(0, 20))}`;
}
