import { Shield, RotateCcw, Truck, BatteryCharging, Lock, Award } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    label: '2-Year Warranty',
    sub: 'Full coverage, no questions',
  },
  {
    icon: RotateCcw,
    label: '30-Day Returns',
    sub: 'Free return shipping',
  },
  {
    icon: Truck,
    label: 'Free US Shipping',
    sub: 'Orders over $50',
  },
  {
    icon: Lock,
    label: 'Secure Checkout',
    sub: '256-bit SSL encryption',
  },
  {
    icon: BatteryCharging,
    label: 'Airline Approved',
    sub: '150+ countries',
  },
  {
    icon: Award,
    label: 'CE & FCC Certified',
    sub: 'Safety tested & approved',
  },
]

export default function TrustBadges() {
  return (
    <div className="border-t pt-6">
      <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">
        Why Shop VOLTA
      </p>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((b) => {
          const Icon = b.icon
          return (
            <div key={b.label} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
              <Icon className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
              <p className="text-[11px] font-semibold leading-tight">{b.label}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{b.sub}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
