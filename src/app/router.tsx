import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@/app/Layout';
import { CoinDetailsPage } from '@/pages/coin-details-page/ui/CoinDetailsPage';
import { CoinsPage } from '@/pages/coins-page/ui/CoinsPage';
import { ComparePage } from '@/pages/compare-page/ui/ComparePage';
import { DashboardPage } from '@/pages/dashboard-page/ui/DashboardPage';
import { WatchlistPage } from '@/pages/watchlist-page/ui/WatchlistPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<DashboardPage />} />
          <Route path="coins" element={<CoinsPage />} />
          <Route path="coins/:coinId" element={<CoinDetailsPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path="compare" element={<ComparePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
