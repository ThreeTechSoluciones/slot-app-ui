export type UpdatePlanRequest = {
    planId: string;
    name: string;
    numberOfDays: number;
    amount?: number;
    startDate?: string;
}