import { BarChart3, Coins, LayoutDashboard, Scale, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { useWatchlist } from '@/features/watchlist';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/coins', label: 'Coins', icon: Coins },
  { to: '/watchlist', label: 'Watchlist', icon: Star },
  { to: '/compare', label: 'Compare', icon: Scale },
];

export function AppSidebar() {
  const { count } = useWatchlist();

  return (
    <aside className="flex w-full flex-col gap-6 rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur md:w-72">
      <div className="space-y-3">
        <Badge className="w-fit bg-sky-500/15 text-sky-700">Crypto Market Radar</Badge>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Track market pulse.</h1>
          <p className="text-sm text-muted-foreground">
            Mock-first crypto workspace for watchlists, comparisons, and fast market reads.
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition',
                isActive
                  ? 'bg-slate-950 text-slate-50'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-3">
                  <Icon className="size-4" />
                  {label}
                </span>
                {label === 'Watchlist' ? (
                  <Badge
                    className={cn(
                      'border-transparent',
                      isActive ? 'bg-white/15 text-white' : 'bg-slate-950/10 text-slate-700',
                    )}
                  >
                    {count}
                  </Badge>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl bg-slate-950 p-4 text-slate-50">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2">
            <BarChart3 className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium">MVP scope</p>
            <p className="text-xs text-slate-300">
              Frontend only, mock data, no auth, no API keys.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
