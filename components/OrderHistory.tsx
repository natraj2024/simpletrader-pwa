
import React from 'react';
import { useMarket } from '../context/MarketContext';

const OrderHistory: React.FC = () => {
  const { trades } = useMarket();

  if (trades.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
        <p className="text-slate-500 font-bold">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div role="status" aria-live="polite" className="sr-only">
        {trades.length} orders total.
      </div>
      <div className="space-y-3">
        {trades.map(trade => (
          <div 
            key={trade.id} 
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex justify-between items-center group"
            role="listitem"
            aria-label={`${trade.type} ${trade.quantity} ${trade.symbol} at ${trade.price.toFixed(2)}`}
          >
            <div className="flex gap-4 items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full font-black text-xs ${trade.type === 'BUY' ? 'bg-emerald-900/30 text-emerald-500 border border-emerald-500/50' : 'bg-red-900/30 text-red-500 border border-red-500/50'}`}>
                {trade.type}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{trade.symbol}</h4>
                <p className="text-xs text-slate-500">{new Date(trade.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-white">₹{trade.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-slate-500">{trade.quantity} units × ₹{trade.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
