export interface StudentMonthlyFeeResponse {
  id: string;
  number: number;
  month: string;
  expirationDate: Date;
  amount: number;
  status: string;
}
