'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Zap, Shield, BatteryCharging, Globe, Truck, RotateCcw, Star, CheckCircle2, Lock } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1400&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1488998527040-85054a85150e?w=1200&q=80'

const features = [
  {
    icon: BatteryCharging,
    title: 'Ultra-Fast Charging',
    desc: '45W PD technology powers your devices up to 3x faster than standard chargers.',
  },
  {
    icon: Globe,
    title: 'Built for Travel',
    desc: 'Airline-carry-on approved. Works with any voltage. 150+ countries covered.',
  },
  {
    icon: Shield,
    title: '2-Year Warranty',
    desc: 'Every product is backed by our comprehensive warranty and lifetime support.',
  },
  {
    icon: Zap,
    title: 'Universal Compatibility',
    desc: 'USB-C, USB-A, Lightning, Micro-USB — one charger for every device you own.',
  },
]

const stats = [
  { value: '50K+', label: 'Travelers Powered' },
  { value: '45W', label: 'Max Charging Speed' },
  { value: '2 Yr', label: 'Warranty' },
  { value: '99%', label: 'Customer Satisfaction' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setSubscribed(true)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-slate-950 text-white overflow-hidden min-h-[88vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="VOLTA portable chargers and travel accessories"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* Blue accent glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl space-y-7">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold uppercase tracking-widest">
              <Zap className="h-3.5 w-3.5" />
              New — The PowerSlim 20K Pro
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.05] tracking-tight text-white">
              Power That
              <br />
              <span className="text-blue-400">Goes Anywhere.</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
              Premium portable chargers and travel accessories engineered for modern explorers.
              Designed to be compact, fast, and utterly reliable — wherever you roam.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider transition-colors rounded-sm"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/70 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors rounded-sm"
                prefetch={true}
              >
                Browse All Gear
              </Link>
            </div>

            {/* Micro trust signals */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                Free US Shipping
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                30-Day Returns
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                2-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-blue-600 text-white">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-blue-500/40">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-2xl font-bold font-heading tracking-tight">{s.value}</p>
                <p className="text-xs text-blue-200 mt-0.5 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── FEATURES ── */}
      <section className="py-section bg-slate-950 text-white">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs text-blue-400 uppercase tracking-[0.2em] font-semibold mb-3">Why VOLTA</p>
            <h2 className="text-h2 font-heading font-bold text-white">
              Built Different. Built Better.
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              We obsess over every milliamp and millimeter so your gear is always ready when you are.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="w-11 h-11 bg-blue-500/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE / EDITORIAL ── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] bg-muted rounded-sm overflow-hidden">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Traveler using VOLTA portable charger on the go"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <BatteryCharging className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">PowerSlim 20K Pro</p>
                    <p className="text-xs text-slate-500">Charging at 45W &bull; 72% full</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs text-blue-600 uppercase tracking-[0.2em] font-semibold">Our Mission</p>
              <h2 className="text-h2 font-heading font-bold text-balance">
                Engineered for the Way You Travel
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We started VOLTA because we were tired of bulky, slow, unreliable power banks.
                Every product we make is slim enough to slip in your pocket, powerful enough to
                charge a laptop, and tough enough to survive any adventure.
              </p>
              <ul className="space-y-3">
                {['Airline carry-on approved in all countries', 'Charges 3 devices simultaneously', 'Tested to 1,000+ charge cycles'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
                prefetch={true}
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-section-sm border-y bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold">Free US Shipping</p>
              <p className="text-xs text-muted-foreground">Orders over $50</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">Hassle-free policy</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold">Secure Checkout</p>
              <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-6 w-6 text-blue-600" strokeWidth={1.5} />
              <p className="text-sm font-semibold">4.9/5 Rating</p>
              <p className="text-xs text-muted-foreground">50,000+ customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-section bg-slate-950 text-white">
        <div className="container-custom max-w-xl text-center">
          <Zap className="h-8 w-8 text-blue-400 mx-auto mb-4" />
          <h2 className="text-h2 font-heading font-bold text-white">Stay Charged In.</h2>
          <p className="mt-3 text-slate-400">
            New gear launches, exclusive discounts, and travel tips — delivered straight to your inbox.
          </p>
          {subscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-blue-400 font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              You&apos;re in! Welcome to VOLTA.
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-blue-500 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors rounded-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap rounded-sm"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
