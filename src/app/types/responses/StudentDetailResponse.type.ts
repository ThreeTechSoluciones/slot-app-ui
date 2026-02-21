import type { StudentSlotResponse } from "./SlotResponse.type";
export interface StudentDetailResponse {
  id: string;
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  age: number;
  pathologies: string;
  admissionDate: string;
  paymentPlanName: string;
  classesPerWeek: number;
  numberOfDays: number;
  paymentDay: number;
  status: boolean;
  situation: string;
  planId: string;
  plan: string;
  payments: PaymentDetailResponse[];
  slots: StudentSlotResponse[];
  slotIds: string[];
}

interface PaymentDetailResponse {
  id: string;
  number: number;
  paymentDate: string;
  amount: number;
  status: string;
  expirationDate: string;
}
