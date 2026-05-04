import type { PriceResponse } from './PriceResponse.type';

export interface PlanResponse {
  id: string;
  name: string;
  currentPrice: number;
  nextPrice: PriceResponse | null;
  futurePrices: PriceResponse[];
  numberOfDays: number;
  totalFuturePrices: number | null;
}
