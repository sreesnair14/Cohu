import { useState } from 'react'
import { CLASSIFICATIONS, classify } from '../lib/materiality'
import { PILLARS } from '../data/topics'

// SVG geometry — landscape plot in a 1.0–5.0 × 1.0–5.0 domain.
const VB_W = 900
const VB_H = 620
const M = { top: 28, right: 40, bottom: 54, left: 60 }
const PLOT_W = VB_W - M.left - M.right
const PLOT_H = VB_H - M.top - M.bottom
const DOMAIN_MIN = 1.0
const DOMAIN_MAX = 5.0
const DOT_R = 9

const sx = (v) => M.left + ((v - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * PLOT_W
const sy = (v) => M.top + ((DOMAIN_MAX - v) / (DOMAIN_MAX - DOMAIN_MIN)) * PLOT_H

// A zone rectangle expressed in data coordinates.
const rect = (x0, y0, x1, y1, fill) => ({
  x: sx(x0),
  y: sy(y1),
  width: sx(x1) - sx(x0),
  height: sy(y0) - sy(y1),
  fill,
})

// Painted back-to-front — higher-priority zones cover lower ones, exactly
// reproducing the classification regions from Section 9.
const ZONE_RECTS = [
  // Not Material — base layer covering the full chart area.
  rect(1, 1, 5, 5, CLASSIFICATIONS.NOT_MATERIAL.fill),
  // Watch List — where at least one axis is 2.0–2.9.
  rect(2, 1, 3, 5, CLASSIFICATIONS.WATCH_LIST.fill),
  rect(1, 2, 5, 3, CLASSIFICATIONS.WATCH_LIST.fill),
  // Material — where at least one axis is ≥3.0.
  rect(3, 1, 5, 5, CLASSIFICATIONS.MATERIAL.fill),
  rect(1, 3, 5, 5, CLASSIFICATIONS.MATERIAL.fill),
  // Highly Material — where both axes are ≥3.5.
  rect(3.5, 3.5, 5, 5, CLASSIFICATIONS.HIGHLY_MATERIAL.fill),
]

const ZONE_LABELS = [
  { text: 'HIGHLY MATERIAL', x: 4.25, y: 4.25, color: '#a5352a' },
  { text: 'MATERIAL', x: 1.9, y: 4.6, color: '#b3742a' },
  { text: 'WATCH LIST', x: 2.5, y: 1.5, color: '#71717a' },
  { text: 'NOT MATERIAL', x: 1.45, y: 1.35, color: '#8a8a92' },
]

const THRESHOLDS = [2.0, 3.0, 3.5]
const TICKS = [1, 2, 3, 4, 5]

export default function MatrixChart({ topics }) {
  const [hover, setHover] = useState(null)

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label="Double materiality matrix scatter chart"
      >
        {/* Background zones */}
        {ZONE_RECTS.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill={r.fill} />
        ))}

        {/* Zone labels */}
        {ZONE_LABELS.map((z) => (
          <text
            key={z.text}
            x={sx(z.x)}
            y={sy(z.y)}
            fill={z.color}
            fontSize="14"
            fontWeight="600"
            letterSpacing="1.5"
            textAnchor="middle"
            opacity="0.9"
          >
            {z.text}
          </text>
        ))}

        {/* Threshold lines */}
        {THRESHOLDS.map((t) => (
          <g key={`t-${t}`}>
            <line
              x1={sx(t)}
              y1={M.top}
              x2={sx(t)}
              y2={M.top + PLOT_H}
              stroke="#71717a"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <line
              x1={M.left}
              y1={sy(t)}
              x2={M.left + PLOT_W}
              y2={sy(t)}
              stroke="#71717a"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </g>
        ))}

        {/* Plot border */}
        <rect
          x={M.left}
          y={M.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />

        {/* Axis ticks + labels */}
        {TICKS.map((t) => (
          <g key={`x-${t}`}>
            <line
              x1={sx(t)}
              y1={M.top + PLOT_H}
              x2={sx(t)}
              y2={M.top + PLOT_H + 6}
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <text
              x={sx(t)}
              y={M.top + PLOT_H + 20}
              fill="#52525b"
              fontSize="12"
              textAnchor="middle"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}
        {TICKS.map((t) => (
          <g key={`y-${t}`}>
            <line
              x1={M.left - 6}
              y1={sy(t)}
              x2={M.left}
              y2={sy(t)}
              stroke="#1a1a1a"
              strokeWidth="1"
            />
            <text
              x={M.left - 12}
              y={sy(t) + 4}
              fill="#52525b"
              fontSize="12"
              textAnchor="end"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Axis titles */}
        <text
          x={M.left + PLOT_W / 2}
          y={VB_H - 12}
          fill="#1a1a1a"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Financial Risk →
        </text>
        <text
          x={16}
          y={M.top + PLOT_H / 2}
          fill="#1a1a1a"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(-90 16 ${M.top + PLOT_H / 2})`}
        >
          Impact →
        </text>

        {/* Topic dots */}
        {topics.map((topic) => {
          const cx = sx(topic.financialRisk)
          const cy = sy(topic.impact)
          const color = PILLARS[topic.pillar].color
          const isHover = hover && hover.name === topic.name
          return (
            <circle
              key={topic.name}
              cx={cx}
              cy={cy}
              r={isHover ? DOT_R + 2 : DOT_R}
              fill={color}
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0.92"
              style={{ cursor: 'pointer', transition: 'r 120ms ease' }}
              onMouseEnter={() =>
                setHover({ ...topic, cx: (cx / VB_W) * 100, cy: (cy / VB_H) * 100 })
              }
              onMouseLeave={() => setHover(null)}
            />
          )
        })}
      </svg>

      {/* Hover tooltip */}
      {hover && (
        <div
          className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-full rounded-md border border-zinc-200 bg-white px-3 py-2 shadow-lg"
          style={{ left: `${hover.cx}%`, top: `calc(${hover.cy}% - 14px)` }}
        >
          <div className="mb-1 flex items-start gap-2">
            <span
              className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: PILLARS[hover.pillar].color }}
            />
            <span className="text-sm font-semibold leading-tight text-zinc-900">
              {hover.name}
            </span>
          </div>
          <dl className="ml-4 space-y-0.5 text-xs text-zinc-600">
            <div className="flex justify-between">
              <dt>Financial Risk</dt>
              <dd className="font-medium text-zinc-900">{hover.financialRisk.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Impact</dt>
              <dd className="font-medium text-zinc-900">{hover.impact.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Classification</dt>
              <dd className="font-semibold text-zinc-900">
                {classify(hover.financialRisk, hover.impact).label}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}
