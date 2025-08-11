export interface StudentDetailResponse {
  id: string;
  dni: number;
  name: string;
  lastName: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies: string;
  admissionDate: string;
  planType: string;
  classesPerWeek: number;
  paymentDay: number;
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
