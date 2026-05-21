import { TrendingUp } from 'lucide-react';

export function DashboardHero() {
  return (
    <section className="rounded-[32px] border border-white/70 bg-linear-to-br from-sky-100 via-white to-emerald-100 p-7 shadow-sm">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
            <TrendingUp className="size-3.5" />
            Crypto Market Radar MVP
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold tracking-tight">Read market structure fast.</h2>
            <p className="text-base text-slate-600">
              Dashboard merges mock market data, local watchlist state, and compare-ready flows
              using TanStack Query and shadcn/ui primitives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
