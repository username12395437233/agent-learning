import type { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Search, BarChart3, Zap, CheckCircle } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/discovery', label: 'Discovery', icon: Search },
  { to: '/compare', label: 'Compare', icon: BarChart3 },
  { to: '/integration-requests', label: 'Requests', icon: Zap },
  { to: '/approved-integrations', label: 'Approved', icon: CheckCircle },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              IH
            </div>
            <h1 className="text-xl font-bold">IntegrationHub</h1>
          </div>
          <div className="text-sm text-muted-foreground">B2B API Integration Platform</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-48 border-r bg-muted/20 overflow-y-auto">
          <div className="p-4 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                  location.pathname === to
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
