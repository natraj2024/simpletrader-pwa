
import { Stock } from './types';

export const INITIAL_BALANCE = 1000000; // 10 Lakhs Virtual Money

export const NSE_STOCKS: Stock[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 22450.35, prevClose: 22320.00, change: 130.35, changePercent: 0.58, lotSize: 50, isIndex: true },
  { symbol: 'BANKNIFTY', name: 'Nifty Bank Index', price: 47820.10, prevClose: 47600.00, change: 220.10, changePercent: 0.46, lotSize: 15, isIndex: true },
  { symbol: 'FINNIFTY', name: 'Nifty Financial Services', price: 21100.45, prevClose: 21050.00, change: 50.45, changePercent: 0.24, lotSize: 40, isIndex: true },
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2985.40, prevClose: 2970.00, change: 15.40, changePercent: 0.52, lotSize: 1, isIndex: false },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.25, prevClose: 4150.00, change: -29.75, changePercent: -0.72, lotSize: 1, isIndex: false },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1450.30, prevClose: 1445.00, change: 5.30, changePercent: 0.37, lotSize: 1, isIndex: false },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1620.15, prevClose: 1630.00, change: -9.85, changePercent: -0.60, lotSize: 1, isIndex: false },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1080.50, prevClose: 1070.00, change: 10.50, changePercent: 0.98, lotSize: 1, isIndex: false },
  { symbol: 'NIFTYBEES', name: 'Nippon India Nifty 50 ETF', price: 245.20, prevClose: 244.10, change: 1.10, changePercent: 0.45, lotSize: 1, isIndex: false },
];

export const HOLIDAYS_2024 = [
  '2024-01-26', // Republic Day
  '2024-03-08', // Mahashivratri
  '2024-03-25', // Holi
  '2024-03-29', // Good Friday
  '2024-04-11', // Eid-ul-Fitr
  '2024-04-17', // Ram Navami
  '2024-05-01', // Maharashtra Day
  '2024-06-17', // Bakri Id
  '2024-07-17', // Muharram
  '2024-08-15', // Independence Day
  '2024-10-02', // Gandhi Jayanti
  '2024-11-01', // Diwali
  '2024-11-15', // Guru Nanak Jayanti
  '2024-12-25', // Christmas
];
