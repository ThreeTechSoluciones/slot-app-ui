export interface StudentMonthlyFeeResponse {
  id: string;
  number: number;
  month: string;
  expirationDate: number[];
  amount: number;
  status: string;
  paymentId: string;
}
