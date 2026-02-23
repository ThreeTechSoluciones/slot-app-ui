export interface PaymentMetrics {
  paidCount: number;
  expiredCount: number;
  paidOutOfTimeCount: number;
}

export interface StudentSummary {
  activeStudentsCount: number;
  activeStudentsWithDebtCount: number;
  inactiveStudentsWithDebtCount: number;
}
