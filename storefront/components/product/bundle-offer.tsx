'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Package, Zap, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'

interface BundleOfferProps {
  primaryVariantId: string
  bundleVariantId: string
  bundleTitle: string
  primaryPrice: number
  bundlePrice: number
  bundleSavings: number
  currency?: string
}

function formatCents(cents: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export default function BundleOffer({
  primaryVariantId,
  bundleVariantId,
  bundleTitle,
  primaryPrice,
  bundlePrice,
  bundleSavings,
  currency = 'usd',
}: BundleOfferProps) {
  const { addItem, isAddingItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAddBundle = () => {
    // Add both items to cart
    addItem(
      { variantId: primaryVariantId, quantity: 1 },
      {
        onSuccess: () => {
          addItem(
            { variantId: bundleVariantId, quantity: 1 },
            {
              onSuccess: () => {
                setJustAdded(true)
                toast.success('Bundle added to bag — saving ' + formatCents(bundleSavings, currency))
                setTimeout(() => setJustAdded(false), 3000)
              },
              onError: () => {
                toast.error('Could not add bundle item')
              },
            }
          )
        },
        onError: () => {
          toast.error('Could not add to bag')
        },
      }
    )
  }

  return (
    <div className="border border-blue-200 bg-blue-50/60 rounded-lg p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Package className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Bundle &amp; Save
          </p>
          <p className="text-xs text-muted-foreground">
            Pair with {bundleTitle} — save {formatCents(bundleSavings, currency)}
          </p>
        </div>
        <span className="ml-auto bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          Best Value
        </span>
      </div>

      {/* Bundle Items */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">This item</span>
          <span className="font-medium">{formatCents(primaryPrice, currency)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{bundleTitle}</span>
          <span className="font-medium">{formatCents(bundlePrice, currency)}</span>
        </div>
        <div className="flex items-center justify-between text-sm border-t pt-2 mt-2">
          <span className="font-bold text-blue-700">Bundle Total</span>
          <div className="text-right">
            <span className="font-bold text-blue-700">{formatCents(primaryPrice + bundlePrice - bundleSavings, currency)}</span>
            <span className="ml-2 text-xs text-muted-foreground line-through">{formatCents(primaryPrice + bundlePrice, currency)}</span>
          </div>
        </div>
      </div>

      {/* Bundle CTA */}
      <button
        onClick={handleAddBundle}
        disabled={isAddingItem || justAdded}
        className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wide transition-all rounded-sm ${
          justAdded
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 hover:bg-blue-500 text-white'
        }`}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Bundle Added to Bag
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Add Bundle — Save {formatCents(bundleSavings, currency)}
          </>
        )}
      </button>
    </div>
  )
}
