'use client'

import { useState, useEffect } from 'react'
import { Flame, Clock } from 'lucide-react'

interface UrgencyBarProps {
  stockCount?: number
  saleEndsHours?: number
}

export default function UrgencyBar({ stockCount = 7, saleEndsHours = 12 }: UrgencyBarProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: saleEndsHours, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set a deadline 12h from first render (stored in sessionStorage so it persists on refresh)
    const key = 'volta_sale_deadline'
    let deadline = parseInt(sessionStorage.getItem(key) || '0', 10)
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + saleEndsHours * 60 * 60 * 1000
      sessionStorage.setItem(key, String(deadline))
    }

    const tick = () => {
      const diff = Math.max(0, deadline - Date.now())
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ hours, minutes, seconds })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [saleEndsHours])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="space-y-2">
      {/* Low Stock */}
      {stockCount <= 10 && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-md px-4 py-2.5">
          <Flame className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-red-700">
            Only {stockCount} left in stock — selling fast
          </p>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${i < stockCount ? 'bg-red-500' : 'bg-red-200'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sale Countdown */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-md px-4 py-2.5">
        <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
        <p className="text-sm font-semibold text-amber-800">
          Launch price ends in
        </p>
        <div className="ml-auto flex items-center gap-1 font-mono text-sm font-bold text-amber-800">
          <span className="bg-amber-200 rounded px-1.5 py-0.5">{pad(timeLeft.hours)}</span>
          <span>:</span>
          <span className="bg-amber-200 rounded px-1.5 py-0.5">{pad(timeLeft.minutes)}</span>
          <span>:</span>
          <span className="bg-amber-200 rounded px-1.5 py-0.5">{pad(timeLeft.seconds)}</span>
        </div>
      </div>
    </div>
  )
}
