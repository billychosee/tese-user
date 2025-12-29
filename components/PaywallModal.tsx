"use client";

import { useState } from "react";
import { X, Lock, CreditCard, DollarSign } from "lucide-react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  price: number;
  onPurchase: () => void;
  onSubscribe?: () => void;
  channelName?: string;
  subscriptionPrice?: number;
}

export default function PaywallModal({
  isOpen,
  onClose,
  videoTitle,
  price,
  onPurchase,
  onSubscribe,
  channelName,
  subscriptionPrice,
}: PaywallModalProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await onPurchase();
      onClose();
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    try {
      await onSubscribe?.();
      onClose();
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img src="/Tese-Logo.svg" alt="TESE Logo" className="w-12 h-12" />
            <div>
              <h2 className="text-xl font-bold text-white">Access Required</h2>
              <p className="text-sm text-gray-400">Unlock this video</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg hover:bg-gray-700"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-white">
              {videoTitle}
            </h3>
            <p className="text-gray-400">
              This video requires payment to watch
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Pay-per-view option */}
            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="flex items-center justify-between w-full p-4 text-white transition-all duration-200 transform rounded-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={24} />
                <div className="text-left">
                  <div className="font-semibold">One-time Payment</div>
                  <div className="text-sm opacity-80">
                    Pay once, watch forever
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={20} />
                <span className="text-lg font-bold">R{price}</span>
              </div>
            </button>

            {/* Subscription option */}
            {onSubscribe && channelName && subscriptionPrice && (
              <button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="flex items-center justify-between w-full p-4 text-white transition-all duration-200 transform bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <DollarSign size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">
                      Subscribe to Channel
                    </div>
                    <div className="text-sm opacity-80">
                      Unlimited access to all videos
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={20} />
                  <span className="font-bold">R{subscriptionPrice}/mo</span>
                </div>
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 text-xs text-center text-gray-500 border-t border-gray-700">
            <p>Secure payment processing • No hidden fees</p>
            <p className="mt-1">You can cancel subscriptions anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
