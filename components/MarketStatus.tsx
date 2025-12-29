
import React, { useState, useEffect } from 'react';
import { HOLIDAYS_2024 } from '../constants';

const MarketStatus: React.FC = () => {
  const [status, setStatus] = useState<{ label: string, color: string }>({ label: 'Checking...', color: 'text-slate-400' });

  useEffect(() => {
    const checkMarket = () => {
      // Create IST Date
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const day = istTime.getDay(); // 0 (Sun) to 6 (Sat)
      const dateStr = istTime.toISOString().split('T')[0];

      const currentTimeInMins = hours * 60 + minutes;

      // 1. Weekend
      if (day === 0 || day === 6) {
        return setStatus({ label: 'MARKET CLOSED (WEEKEND)', color: 'text-red-500' });
      }

      // 2. Holiday
      if (HOLIDAYS_2024.includes(dateStr)) {
        return setStatus({ label: 'MARKET CLOSED (TRADING HOLIDAY)', color: 'text-red-500' });
      }

      // 3. Pre-Open (9:00 - 9:15)
      if (currentTimeInMins >= 540 && currentTimeInMins < 555) {
        return setStatus({ label: 'PRE-MARKET OPEN', color: 'text-amber-500' });
      }

      // 4. Market Open (9:15 - 15:30)
      if (currentTimeInMins >= 555 && currentTimeInMins < 930) {
        return setStatus({ label: 'MARKET LIVE', color: 'text-emerald-500' });
      }

      // 5. Post-Market or Closed
      if (currentTimeInMins >= 930 && currentTimeInMins < 1000) {
        return setStatus({ label: 'POST-MARKET SESSION', color: 'text-blue-500' });
      }

      return setStatus({ label: 'MARKET CLOSED', color: 'text-red-500' });
    };

    checkMarket();
    const interval = setInterval(checkMarket, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg" role="region" aria-label="NSE Market Status">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Exchange Status</span>
        <span className={`text-2xl font-black ${status.color}`} aria-live="polite">
          {status.label}
        </span>
      </div>
      <p className="mt-4 text-slate-400 text-sm leading-relaxed">
        Trading in Equity and F&O is active from 09:15 AM to 03:30 PM on weekdays. 
        Quotes are simulated in real-time for educational purposes.
      </p>
    </div>
  );
};

export default MarketStatus;
