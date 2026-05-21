import { Outlet } from 'react-router-dom';

import { AppSidebar } from '@/widgets/app-sidebar';

export function Layout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.35),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(110,231,183,0.28),_transparent_26%),linear-gradient(180deg,_#f8fafc,_#eef2ff)] p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] flex-col gap-4 md:min-h-[calc(100vh-3rem)] xl:flex-row">
        <AppSidebar />
        <main className="min-w-0 flex-1 rounded-[32px] border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
