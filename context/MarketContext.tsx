import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Stock, Holding, Trade, OrderType } from '../types';
import { NSE_STOCKS, INITIAL_BALANCE } from '../constants';
import { audioService } from '../services/audioService';

interface MarketContextType {
  balance: number;
  holdings: Holding[];
  trades: Trade[];
  stocks: Stock[];
  audioEnabled: boolean;
  toggleAudio: () => void;
  placeOrder: (symbol: string, type: OrderType, quantity: number) => string;
  getPnL: () => { total: number, percent: number };
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('st_balance');
    return saved ? JSON.parse(saved) : INITIAL_BALANCE;
  });
  const [holdings, setHoldings] = useState<Holding[]>(() => {
    const saved = localStorage.getItem('st_holdings');
    return saved ? JSON.parse(saved) : [];
  });
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem('st_trades');
    return saved ? JSON.parse(saved) : [];
  });
  const [stocks, setStocks] = useState<Stock[]>(NSE_STOCKS);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('st_balance', JSON.stringify(balance));
    localStorage.setItem('st_holdings', JSON.stringify(holdings));
    localStorage.setItem('st_trades', JSON.stringify(trades));
  }, [balance, holdings, trades]);

  // Mock Market Tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => prevStocks.map(stock => {
        const volatility = 0.002;
        const change = stock.price * (Math.random() - 0.5) * volatility;
        const newPrice = stock.price + change;
        return {
          ...stock,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat((newPrice - stock.prevClose).toFixed(2)),
          changePercent: parseFloat(((newPrice - stock.prevClose) / stock.prevClose * 100).toFixed(2))
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => {
      const newVal = !prev;
      audioService.setEnabled(newVal);
      return newVal;
    });
  }, []);

  const placeOrder = (symbol: string, type: OrderType, quantity: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return "Symbol not found.";

    const price = stock.price;
    const totalCost = price * quantity;

    if (type === OrderType.BUY) {
      if (totalCost > balance) {
        audioService.speak("Order rejected. Insufficient balance.");
        return "Insufficient balance.";
      }
      setBalance(prev => prev - totalCost);
      setHoldings(prev => {
        const existing = prev.find(h => h.symbol === symbol);
        if (existing) {
          const newQty = existing.quantity + quantity;
          const newAvg = (existing.avgPrice * existing.quantity + totalCost) / newQty;
          return prev.map(h => h.symbol === symbol ? { ...h, quantity: newQty, avgPrice: newAvg } : h);
        }
        return [...prev, { symbol, quantity, avgPrice: price }];
      });
    } else {
      const holding = holdings.find(h => h.symbol === symbol);
      if (!holding || holding.quantity < quantity) {
        audioService.speak("Order rejected. Not enough holdings.");
        return "Insufficient holdings.";
      }
      setBalance(prev => prev + totalCost);
      setHoldings(prev => {
        const newQty = holding.quantity - quantity;
        if (newQty === 0) return prev.filter(h => h.symbol !== symbol);
        return prev.map(h => h.symbol === symbol ? { ...h, quantity: newQty } : h);
      });
    }

    const newTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      symbol,
      type,
      quantity,
      price,
      total: totalCost
    };
    setTrades(prev => [newTrade, ...prev]);
    
    const msg = `${type === OrderType.BUY ? 'Buy' : 'Sell'} order for ${quantity} shares of ${symbol} executed at ${price.toFixed(2)}`;
    audioService.speak(msg);
    return "SUCCESS";
  };

  const getPnL = () => {
    let currentVal = 0;
    let investedVal = 0;
    holdings.forEach(h => {
      const stock = stocks.find(s => s.symbol === h.symbol);
      if (stock) {
        currentVal += h.quantity * stock.price;
        investedVal += h.quantity * h.avgPrice;
      }
    });
    const total = currentVal - investedVal;
    const percent = investedVal === 0 ? 0 : (total / investedVal) * 100;
    return { total, percent };
  };

  return (
    <MarketContext.Provider value={{ 
      balance, holdings, trades, stocks, audioEnabled, toggleAudio, placeOrder, getPnL 
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used within MarketProvider");
  return context;
};