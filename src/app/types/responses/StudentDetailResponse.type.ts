export interface StudentDetailResponse {
  id: string;
  dni: number;
  name: string;
  lastName: string;
  cellphoneNumber: string;
  birthday: string;
  age: number;
  pathologies: string;
  admissionDate: string;
  paymentPlan: string;
  classesPerWeek: number;
  paymentDay: number;
  situation: string;
  status: boolean;
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
