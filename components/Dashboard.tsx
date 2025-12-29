
import React from 'react';
import { useMarket } from '../context/MarketContext';
import MarketStatus from './MarketStatus';

const Dashboard: React.FC = () => {
  const { stocks, balance, getPnL } = useMarket();
  const pnl = getPnL();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketStatus />
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col justify-between" role="region" aria-label="Total Margin">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Virtual Capital</span>
          <span className="text-4xl font-black text-white">₹{balance.toLocaleString('en-IN')}</span>
          <p className="text-slate-400 text-sm mt-2">Available for taking new positions.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col justify-between" role="region" aria-label="Day P&L">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Unrealized P&L</span>
          <span className={`text-4xl font-black ${pnl.total >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {pnl.total >= 0 ? '+' : ''}₹{pnl.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
          <p className={`text-sm font-bold ${pnl.total >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ({pnl.percent.toFixed(2)}% overall)
          </p>
        </div>
      </div>

      <section aria-label="Major Indices and Stocks">
        <h3 className="text-xl font-bold mb-4 text-slate-300">Market Watchlist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks.map(stock => (
            <div 
              key={stock.symbol}
              className="bg-slate-900/50 hover:bg-slate-800 border border-slate-800 p-5 rounded-xl transition-colors group cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`${stock.name}, Current Price ${stock.price}, ${stock.change >= 0 ? 'Up' : 'Down'} ${Math.abs(stock.changePercent)} percent`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg text-white">{stock.symbol}</h4>
                  <p className="text-xs text-slate-500 truncate max-w-[120px]">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-100">₹{stock.price.toFixed(2)}</p>
                  <p className={`text-xs font-bold ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.changePercent)}%
                  </p>
                </div>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
                <div 
                  className={`h-full transition-all duration-1000 ${stock.change >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, 50 + stock.changePercent * 5)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
