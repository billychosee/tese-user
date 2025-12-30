"use client";

import React from "react";
import { Channel } from "@/types/channel";
import { useTheme } from "@/components/ThemeProvider";
import SubscriptionButton from "@/components/SubscriptionButton";

interface ChannelCardProps {
  channel: Channel;
  isSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  onClick: () => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  onClick,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={`overflow-hidden transition-all duration-300 rounded-2xl cursor-pointer group ${
        isDarkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {/* Channel Banner */}
      <div className="relative h-24 overflow-hidden">
        <img
          src={channel.banner}
          alt={`${channel.name} banner`}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Channel Avatar */}
        <div className="absolute bottom-0 transform translate-y-1/2 left-4">
          <div className="relative w-16 h-16 overflow-hidden border-4 border-white rounded-full shadow-lg">
            <img
              src={channel.avatar}
              alt={`${channel.name} avatar`}
              className="object-cover w-full h-full"
            />
            {isSubscribed && (
              <div className="absolute flex items-center justify-center w-6 h-6 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Channel Info */}
      <div className="p-4 pt-12">
        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600">
          {channel.name}
        </h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {channel.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {channel.subscriberCount.toLocaleString()} subscribers
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            R{channel.subscriptionPrice}/month
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              isSubscribed ? onUnsubscribe() : onSubscribe();
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
              isSubscribed
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
