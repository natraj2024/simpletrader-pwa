
import React, { useState } from 'react';
import { getTradingAdvice } from '../services/geminiService';
import { audioService } from '../services/audioService';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResponse('Thinking...');
    const result = await getTradingAdvice(query);
    setResponse(result);
    audioService.speak(result);
    setLoading(false);
  };

  return (
    <section className="mt-12 bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-3xl" aria-labelledby="ai-asst-title">
      <h3 id="ai-asst-title" className="text-2xl font-black text-indigo-400 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-indigo-500 text-black rounded-full flex items-center justify-center text-sm">AI</span>
        Market Assistant
      </h3>
      <p className="text-slate-400 mb-6 font-medium">Ask questions about NSE trading, lot sizes, or market concepts. I'll explain them simply.</p>
      
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text" 
          placeholder="e.g. What is NIFTY 50?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-slate-950 border-2 border-indigo-900/50 text-white p-4 rounded-xl focus:border-indigo-400 outline-none transition-colors"
          aria-label="Ask the AI assistant"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95"
        >
          {loading ? 'Consulting...' : 'Ask Assistant'}
        </button>
      </form>

      {response && (
        <div 
          className="mt-8 p-6 bg-slate-950/80 rounded-2xl border border-indigo-500/20 text-indigo-100 leading-relaxed text-lg"
          role="status"
          aria-live="polite"
        >
          {response}
        </div>
      )}
    </section>
  );
};

export default AIAssistant;
