import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import StandaloneAdminDashboard from './pages/StandaloneAdminDashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('admin-root')).render(
  <React.StrictMode>
    <AppProvider>
      <StandaloneAdminDashboard />
    </AppProvider>
  </React.StrictMode>
);
