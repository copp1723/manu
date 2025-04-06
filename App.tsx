import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';

// Placeholder component for lazy-loaded pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="h-full flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-500 dark:text-gray-400">
      This is a placeholder for the {title} page. Content will be added here.
    </p>
  </div>
);

// Lazy-loaded pages for code splitting
const Dashboard = lazy(() => Promise.resolve({
  default: () => <PlaceholderPage title="Dashboard" />
}));

const Leads = lazy(() => Promise.resolve({
  default: () => <PlaceholderPage title="Leads Management" />
}));

const Analytics = lazy(() => Promise.resolve({
  default: () => <PlaceholderPage title="Analytics" />
}));

const Messages = lazy(() => Promise.resolve({
  default: () => <PlaceholderPage title="Messages" />
}));

const Settings = lazy(() => Promise.resolve({
  default: () => <PlaceholderPage title="Settings" />
}));

const NotFound = lazy(() => Promise.resolve({
  default: () => (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <a href="/" className="text-primary-500 hover:underline">
        Return to Dashboard
      </a>
    </div>
  )
}));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />
            <Route path="/leads" element={
              <DashboardLayout>
                <Leads />
              </DashboardLayout>
            } />
            <Route path="/analytics" element={
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            } />
            <Route path="/messages" element={
              <DashboardLayout>
                <Messages />
              </DashboardLayout>
            } />
            <Route path="/settings" element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
