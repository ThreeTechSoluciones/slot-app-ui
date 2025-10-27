export interface StudentDetailResponse {
  id: string;
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies: string;
  admissionDate: string;
  paymentPlanName: string;
  plan: string;
  paymentDay: number;
  status: string;
  situtation: string;
  planId: string;
  payments: PaymentDetailResponse[];
}

interface PaymentDetailResponse {
  id: string;
  number: number;
  paymentDate: string;
  amount: number;
  status: string;
  expirationDate: string;
}
