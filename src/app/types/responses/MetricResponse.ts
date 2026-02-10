export interface PaymentMetrics {
  onTimeCount: number;
  outstandingCount: number;
  payedCount: number;
}

export interface StudentSummary {
  activeStudentsCount: number;
  activeStudentsOnTimeCount: number;
  activeStudentsWithDebtCount: number;
  inactiveStudentsWithDebtCount: number;
}
