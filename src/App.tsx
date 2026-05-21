import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/app/Layout';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Discovery } from '@/pages/Discovery/Discovery';
import { ApiDetails } from '@/pages/ApiDetails/ApiDetails';
import { Compare } from '@/pages/Compare/Compare';
import { IntegrationRequests } from '@/pages/IntegrationRequests/IntegrationRequests';
import { ApprovedIntegrations } from '@/pages/ApprovedIntegrations/ApprovedIntegrations';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/api/:id" element={<ApiDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/integration-requests" element={<IntegrationRequests />} />
          <Route path="/approved-integrations" element={<ApprovedIntegrations />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
