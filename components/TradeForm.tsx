
import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { OrderType } from '../types';

const TradeForm: React.FC = () => {
  const { stocks, placeOrder, balance } = useMarket();
  const [selectedSymbol, setSelectedSymbol] = useState(stocks[0].symbol);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.BUY);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });

  const selectedStock = stocks.find(s => s.symbol === selectedSymbol)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) {
       setMessage({ text: 'Quantity must be at least 1.', type: 'error' });
       return;
    }
    
    const result = placeOrder(selectedSymbol, orderType, quantity);
    if (result === 'SUCCESS') {
      setMessage({ text: `Success: ${orderType} order for ${quantity} ${selectedSymbol} placed!`, type: 'success' });
    } else {
      setMessage({ text: `Failed: ${result}`, type: 'error' });
    }
    
    // Clear message after 5 seconds
    setTimeout(() => setMessage({ text: '', type: null }), 5000);
  };

  const calculateTotal = () => (selectedStock.price * quantity).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-slate-800 p-4 flex justify-around">
        <button 
          onClick={() => setOrderType(OrderType.BUY)}
          className={`flex-1 py-3 font-black text-xl rounded-lg transition-all ${orderType === OrderType.BUY ? 'bg-emerald-600 text-white shadow-lg translate-y-[-2px]' : 'text-slate-400 hover:text-white'}`}
          aria-current={orderType === OrderType.BUY ? 'step' : undefined}
        >
          BUY
        </button>
        <button 
          onClick={() => setOrderType(OrderType.SELL)}
          className={`flex-1 py-3 font-black text-xl rounded-lg transition-all ${orderType === OrderType.SELL ? 'bg-red-600 text-white shadow-lg translate-y-[-2px]' : 'text-slate-400 hover:text-white'}`}
          aria-current={orderType === OrderType.SELL ? 'step' : undefined}
        >
          SELL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {message.text && (
          <div 
            role="alert" 
            className={`p-4 rounded-lg font-bold text-center ${message.type === 'success' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-500' : 'bg-red-900/50 text-red-300 border border-red-500'}`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="symbol-select" className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Select Instrument</label>
          <select 
            id="symbol-select"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="w-full bg-slate-800 border-2 border-slate-700 text-white p-4 rounded-xl text-lg font-bold focus:border-amber-500 outline-none transition-colors"
          >
            {stocks.map(s => (
              <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="qty-input" className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Quantity</label>
            <input 
              id="qty-input"
              type="number"
              min="1"
              step={selectedStock.isIndex ? selectedStock.lotSize : 1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-800 border-2 border-slate-700 text-white p-4 rounded-xl text-lg font-bold focus:border-amber-500 outline-none"
            />
            {selectedStock.isIndex && (
              <p className="text-xs text-amber-500 font-bold">Lot size: {selectedStock.lotSize}</p>
            )}
          </div>
          <div className="space-y-2">
             <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Current Price</label>
             <div className="w-full bg-slate-950/50 border-2 border-transparent p-4 rounded-xl text-lg font-bold text-slate-200">
               ₹{selectedStock.price.toFixed(2)}
             </div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
           <div className="flex justify-between items-center mb-1">
             <span className="text-slate-500 font-bold">Order Value:</span>
             <span className="text-xl font-black text-white">₹{calculateTotal()}</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-slate-500 font-bold">Post-Trade Margin:</span>
             <span className="text-slate-300">₹{(balance - (orderType === OrderType.BUY ? Number(calculateTotal()) : 0)).toLocaleString('en-IN')}</span>
           </div>
        </div>

        <button 
          type="submit"
          className={`w-full py-5 rounded-xl font-black text-2xl transition-all shadow-xl active:scale-[0.98] ${
            orderType === OrderType.BUY ? 'bg-emerald-500 hover:bg-emerald-400 text-black' : 'bg-red-500 hover:bg-red-400 text-white'
          }`}
          aria-label={`Confirm ${orderType} ${quantity} ${selectedSymbol}`}
        >
          CONFIRM {orderType}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
