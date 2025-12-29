"use client";

import React, { useState } from "react";
import type { Channel } from "@/types/channel";
import { channelApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function CreatorsList({ creators }: { creators: Channel[] }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [subs, setSubs] = useState<Record<string, boolean>>(
    Object.fromEntries(creators.map((c) => [c.id, !!c.isSubscribed]))
  );
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const toggleSubscribe = async (channelId: string) => {
    if (!isAuthenticated) {
      router.push("/"); // send to login/home
      return;
    }

    if (loadingIds.includes(channelId)) return;
    setLoadingIds((s) => [...s, channelId]);

    try {
      const currently = !!subs[channelId];
      const res = currently
        ? await channelApi.unsubscribe(channelId)
        : await channelApi.subscribe(channelId);

      if (res.success) {
        setSubs((s) => ({ ...s, [channelId]: !currently }));
      }
    } catch (err) {
      console.warn("subscribe error", err);
    } finally {
      setLoadingIds((s) => s.filter((id) => id !== channelId));
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar">
      {creators.map((ch) => (
        <div
          key={ch.id}
          className="p-4 w-44 bg-zimbabwe-white/5 rounded-2xl shrink-0"
        >
          <div className="flex items-center gap-3">
            <img
              src={ch.avatar}
              alt={ch.name}
              className="object-cover w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-semibold truncate">{ch.name}</p>
              <p className="text-xs text-zimbabwe-white/60">
                {ch.subscriberCount?.toLocaleString() ?? "--"} subscribers
              </p>
            </div>
            <button
              onClick={() => toggleSubscribe(ch.id)}
              disabled={loadingIds.includes(ch.id)}
              className={`px-3 py-1 text-sm rounded-lg font-bold ${
                subs[ch.id]
                  ? "bg-zimbabwe-white/10 text-zimbabwe-white/80"
                  : "bg-zimbabwe-red text-zimbabwe-black"
              }`}
            >
              {loadingIds.includes(ch.id)
                ? "..."
                : subs[ch.id]
                ? "Subscribed"
                : "Subscribe"}
            </button>
          </div>
          <p className="mt-3 text-sm text-zimbabwe-white/60 line-clamp-2">
            {ch.description}
          </p>
        </div>
      ))}
    </div>
  );
}
