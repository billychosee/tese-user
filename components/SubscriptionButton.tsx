'use client'

import { useState } from 'react'
import { DollarSign, Check, X } from 'lucide-react'

interface SubscriptionButtonProps {
  isSubscribed: boolean
  price: number
  onSubscribe: () => void
  onUnsubscribe: () => void
  disabled?: boolean
}

export default function SubscriptionButton({
  isSubscribed,
  price,
  onSubscribe,
  onUnsubscribe,
  disabled = false
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscription = async () => {
    if (disabled || isLoading) return
    
    setIsLoading(true)
    
    try {
      if (isSubscribed) {
        await onUnsubscribe()
      } else {
        await onSubscribe()
      }
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscription}
      disabled={disabled || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isSubscribed
          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
          : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
      } ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>{isSubscribed ? 'Processing...' : 'Processing...'}</span>
        </>
      ) : isSubscribed ? (
        <>
          <Check size={20} />
          <span>Subscribed</span>
        </>
      ) : (
        <>
          <DollarSign size={20} />
          <span>Subscribe - R{price}/month</span>
        </>
      )}
    </button>
  )
}