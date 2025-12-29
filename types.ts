
export enum MarketStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  PRE_OPEN = 'PRE_OPEN',
  POST_MARKET = 'POST_MARKET'
}

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  prevClose: number;
  change: number;
  changePercent: number;
  lotSize: number;
  isIndex: boolean;
}

export interface Trade {
  id: string;
  timestamp: number;
  symbol: string;
  type: OrderType;
  quantity: number;
  price: number;
  total: number;
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export interface AppState {
  balance: number;
  holdings: Holding[];
  trades: Trade[];
  audioEnabled: boolean;
}
