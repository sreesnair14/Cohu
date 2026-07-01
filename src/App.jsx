import { useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MatrixChart from './components/MatrixChart'
import Legend from './components/Legend'
import { TOPICS } from './data/topics'
import { exportChartToPdf } from './lib/exportPdf'

export default function App() {
  const [active, setActive] = useState({ E: true, S: true, G: true })
  const [exporting, setExporting] = useState(false)
  const captureRef = useRef(null)

  const toggle = (code) => setActive((prev) => ({ ...prev, [code]: !prev[code] }))

  const visibleTopics = useMemo(
    () => TOPICS.filter((t) => active[t.pillar]),
    [active],
  )

  const handleExport = async () => {
    if (!captureRef.current || exporting) return
    setExporting(true)
    try {
      await exportChartToPdf(captureRef.current)
    } catch (err) {
      // Surface failures without crashing the view.
      console.error('PDF export failed:', err)
      alert('Sorry — the PDF export could not be generated. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="min-h-full w-full px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Controls (excluded from the PDF capture) */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar active={active} onToggle={toggle} />
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-corporate-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {exporting ? 'Generating…' : 'Download PDF'}
          </button>
        </div>

        {/* Branded, exportable region */}
        <div
          ref={captureRef}
          className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <Header />
          <div className="py-5">
            <MatrixChart topics={visibleTopics} />
          </div>
          <Legend />
          <p className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
            The Corporate — Double Materiality Assessment 2025 — Confidential
          </p>
        </div>
      </div>
    </div>
  )
}
