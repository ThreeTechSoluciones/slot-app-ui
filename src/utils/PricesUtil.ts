import type { PlanResponse } from '../app/types/responses/PlanResponse.type';

export const getTotalFuturePrices = (plan: PlanResponse | null | undefined): number | null => {
  if (plan?.futurePrices?.length) return plan.futurePrices.length + 1;
  if (plan?.nextPrice) return 1;
  return null;
};
