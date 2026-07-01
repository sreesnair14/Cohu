import { PILLARS } from '../data/topics'

export default function FilterBar({ active, onToggle }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-zinc-500">Filter:</span>
      {Object.values(PILLARS).map((p) => {
        const isActive = active[p.code]
        return (
          <button
            key={p.code}
            type="button"
            onClick={() => onToggle(p.code)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              isActive
                ? 'border-zinc-300 bg-white text-zinc-900 shadow-sm'
                : 'border-zinc-200 bg-zinc-100 text-zinc-400'
            }`}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full transition"
              style={{ backgroundColor: p.color, opacity: isActive ? 1 : 0.35 }}
            />
            {p.label}
          </button>
        )
      })}
    </div>
  )
}
