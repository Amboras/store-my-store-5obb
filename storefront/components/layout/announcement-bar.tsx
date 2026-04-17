'use client'

import { useState } from 'react'
import { X, Zap } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-foreground text-primary-foreground">
      <div className="container-custom flex items-center justify-center py-2.5 text-sm tracking-wide gap-2">
        <Zap className="h-3.5 w-3.5 flex-shrink-0" />
        <p>Free US shipping on orders over $50 &mdash; Power up anywhere, anytime</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
