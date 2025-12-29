
import React from 'react';
import { useMarket } from '../context/MarketContext';

const Portfolio: React.FC = () => {
  const { holdings, stocks, getPnL } = useMarket();
  const summary = getPnL();

  if (holdings.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900 border border-dashed border-slate-700 rounded-3xl">
        <p className="text-2xl text-slate-500 font-bold">Your portfolio is empty.</p>
        <p className="text-slate-600 mt-2">Go to the Trade page to buy your first stock.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-wrap gap-12 items-center" role="region" aria-label="Portfolio Summary">
        <div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Invested Value</p>
          <p className="text-3xl font-black text-white">₹{(summary.total / (summary.percent / 100 + 1) || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Current Value</p>
          <p className="text-3xl font-black text-white">₹{(summary.total + (summary.total / (summary.percent / 100 + 1) || 0)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="h-12 w-px bg-slate-800 hidden md:block"></div>
        <div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Unrealized P&L</p>
          <p className={`text-3xl font-black ${summary.total >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {summary.total >= 0 ? '+' : ''}₹{summary.total.toLocaleString('en-IN')}
            <span className="text-lg ml-2 opacity-80">({summary.percent.toFixed(2)}%)</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left bg-slate-900">
          <caption className="sr-only">List of currently held stocks and indices</caption>
          <thead className="bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <tr>
              <th scope="col" className="px-6 py-4">Instrument</th>
              <th scope="col" className="px-6 py-4 text-right">Qty</th>
              <th scope="col" className="px-6 py-4 text-right">Avg Price</th>
              <th scope="col" className="px-6 py-4 text-right">LTP</th>
              <th scope="col" className="px-6 py-4 text-right">Cur. Value</th>
              <th scope="col" className="px-6 py-4 text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {holdings.map(h => {
              const stock = stocks.find(s => s.symbol === h.symbol);
              const ltp = stock?.price || 0;
              const curVal = h.quantity * ltp;
              const invested = h.quantity * h.avgPrice;
              const pnl = curVal - invested;
              const pnlPct = (pnl / invested) * 100;

              return (
                <tr key={h.symbol} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-5 font-bold text-white">{h.symbol}</td>
                  <td className="px-6 py-5 text-right font-mono text-slate-300">{h.quantity}</td>
                  <td className="px-6 py-5 text-right font-mono text-slate-300">₹{h.avgPrice.toFixed(2)}</td>
                  <td className="px-6 py-5 text-right font-mono text-white">₹{ltp.toFixed(2)}</td>
                  <td className="px-6 py-5 text-right font-mono text-white">₹{curVal.toLocaleString('en-IN')}</td>
                  <td className={`px-6 py-5 text-right font-bold ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                    <div className="text-[10px] opacity-70">({pnlPct.toFixed(2)}%)</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
