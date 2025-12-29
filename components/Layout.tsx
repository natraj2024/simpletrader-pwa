
import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';

const Layout: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => {
  const { toggleAudio, audioEnabled, balance } = useMarket();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus management on route change
    titleRef.current?.focus();
    window.scrollTo(0, 0);
  }, [title]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'd': navigate('/'); break;
          case 'b': navigate('/trade'); break;
          case 'p': navigate('/portfolio'); break;
          case 'h': navigate('/history'); break;
          case 'm': navigate('/status'); break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-amber-500 tracking-tight">SimpleTrader</h1>
          <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400 font-mono">NSE-VIRTUAL</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 uppercase tracking-widest">Available Margin</p>
            <p className="text-xl font-bold text-white">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          </div>
          
          <button
            onClick={toggleAudio}
            className={`px-4 py-2 rounded-lg border-2 transition-all font-bold ${
              audioEnabled ? 'bg-amber-500 border-amber-400 text-black' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            aria-pressed={audioEnabled}
            aria-label={audioEnabled ? "Turn off audio feedback" : "Turn on audio feedback"}
          >
            {audioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 bg-slate-900 border-r border-slate-800 hidden md:block" aria-label="Main Navigation">
          <ul className="p-4 space-y-2">
            <li>
              <NavLink to="/" className={({isActive}) => `flex items-center p-3 rounded-lg font-bold transition-colors ${isActive ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Dashboard <span className="ml-auto text-xs opacity-60">Alt+D</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/trade" className={({isActive}) => `flex items-center p-3 rounded-lg font-bold transition-colors ${isActive ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Buy / Sell <span className="ml-auto text-xs opacity-60">Alt+B</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={({isActive}) => `flex items-center p-3 rounded-lg font-bold transition-colors ${isActive ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Portfolio <span className="ml-auto text-xs opacity-60">Alt+P</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({isActive}) => `flex items-center p-3 rounded-lg font-bold transition-colors ${isActive ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Orders <span className="ml-auto text-xs opacity-60">Alt+H</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/status" className={({isActive}) => `flex items-center p-3 rounded-lg font-bold transition-colors ${isActive ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Market Info <span className="ml-auto text-xs opacity-60">Alt+M</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <main id="main-content" className="flex-1 p-6 md:p-10" aria-label={title}>
          <h2 
            ref={titleRef} 
            tabIndex={-1} 
            className="text-3xl font-bold mb-8 outline-none text-slate-100"
          >
            {title}
          </h2>
          {children}
        </main>
      </div>

      <footer className="bg-slate-900 border-t border-slate-800 p-6 text-center text-slate-500 text-sm">
        <p>© 2024 SimpleTrader India. WCAG 2.2 AA Compliant. Educational Paper Trading Only.</p>
        <p className="mt-2">Supports NVDA, JAWS, and VoiceOver. Standard NSE Trading hours: 9:15 AM to 3:30 PM IST.</p>
      </footer>
    </div>
  );
};

export default Layout;
