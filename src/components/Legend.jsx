import { CLASSIFICATIONS } from '../lib/materiality'
import { PILLARS } from '../data/topics'

const ZONE_ORDER = [
  CLASSIFICATIONS.HIGHLY_MATERIAL,
  CLASSIFICATIONS.MATERIAL,
  CLASSIFICATIONS.WATCH_LIST,
  CLASSIFICATIONS.NOT_MATERIAL,
]

export default function Legend() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-zinc-200 pt-4">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Zones
        </span>
        {ZONE_ORDER.map((z) => (
          <div key={z.key} className="flex items-center gap-2">
            <span
              className="inline-block h-3.5 w-3.5 rounded-sm border border-zinc-300"
              style={{ backgroundColor: z.swatch }}
            />
            <span className="text-xs font-medium text-zinc-600">{z.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Pillars
        </span>
        {Object.values(PILLARS).map((p) => (
          <div key={p.code} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-xs font-medium text-zinc-600">
              {p.code} — {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
