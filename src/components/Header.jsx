export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-corporate-ink">
          <span className="text-[15px] font-medium tracking-wide text-white">[ C ]</span>
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-medium text-zinc-900">The Corporate</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
            ESG Assessment
          </div>
        </div>
      </div>
      <div className="text-right leading-tight">
        <div className="text-[15px] font-semibold text-zinc-900 sm:text-lg">
          Double Materiality Matrix
        </div>
        <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
          Assessment Year 2025
        </div>
      </div>
    </header>
  )
}
