"use client";

import React from "react";
import SubscriptionButton from "@/components/SubscriptionButton";

export default function SubscriptionButtonDemo() {
  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">SubscriptionButton Demo</h2>
      <SubscriptionButton isSubscribed={false} price={49} onSubscribe={() => alert('subscribed')} onUnsubscribe={() => alert('unsubscribed')} />
    </div>
  );
}
