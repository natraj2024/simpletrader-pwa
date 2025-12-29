
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TradeForm from './components/TradeForm';
import Portfolio from './components/Portfolio';
import OrderHistory from './components/OrderHistory';
import MarketStatus from './components/MarketStatus';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <MarketProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout title="Your Market Overview">
              <Dashboard />
              <AIAssistant />
            </Layout>
          } />
          <Route path="/trade" element={
            <Layout title="Place New Order">
              <TradeForm />
            </Layout>
          } />
          <Route path="/portfolio" element={
            <Layout title="Holdings & Portfolio">
              <Portfolio />
            </Layout>
          } />
          <Route path="/history" element={
            <Layout title="Order Book History">
              <OrderHistory />
            </Layout>
          } />
          <Route path="/status" element={
            <Layout title="NSE Market Status Info">
              <div className="max-w-2xl mx-auto space-y-8">
                <MarketStatus />
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                  <h4 className="text-xl font-bold mb-4 text-white">NSE Trading Hours</h4>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex justify-between">
                      <span>Pre-Open Session</span>
                      <span className="font-mono text-amber-500">09:00 AM – 09:15 AM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Regular Market Hours</span>
                      <span className="font-mono text-emerald-500">09:15 AM – 03:30 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Closing Session</span>
                      <span className="font-mono text-blue-500">03:40 PM – 04:00 PM</span>
                    </li>
                  </ul>
                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <h4 className="text-xl font-bold mb-4 text-white">Support & Accessibility</h4>
                    <p className="text-slate-400">
                      Use <kbd className="bg-slate-800 px-2 py-1 rounded text-white text-xs">Alt + [Letter]</kbd> to jump between pages. 
                      Every price update is polite to screen readers. Enable 'AUDIO ON' for spoken confirmations.
                    </p>
                  </div>
                </div>
              </div>
            </Layout>
          } />
        </Routes>
      </Router>
    </MarketProvider>
  );
};

export default App;
