'use client'

import { useProduct } from '@/hooks/use-product'
import BundleOffer from './bundle-offer'

interface BundleOfferWrapperProps {
  primaryProductHandle: string
  bundleVariantId: string
  bundleTitle: string
  bundlePrice: number
  bundleSavings: number
}

export default function BundleOfferWrapper({
  primaryProductHandle,
  bundleVariantId,
  bundleTitle,
  bundlePrice,
  bundleSavings,
}: BundleOfferWrapperProps) {
  const { data: product } = useProduct(primaryProductHandle)
  const primaryVariantId = product?.variants?.[0]?.id

  if (!primaryVariantId) return null

  // Get the base price from the first variant's calculated_price
  const cp = product?.variants?.[0]?.calculated_price
  const primaryPrice =
    cp && typeof cp === 'object' && 'calculated_amount' in cp
      ? ((cp as { calculated_amount?: number }).calculated_amount ?? 7995)
      : 7995

  return (
    <BundleOffer
      primaryVariantId={primaryVariantId}
      bundleVariantId={bundleVariantId}
      bundleTitle={bundleTitle}
      primaryPrice={primaryPrice}
      bundlePrice={bundlePrice}
      bundleSavings={bundleSavings}
      currency="usd"
    />
  )
}
