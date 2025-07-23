import type { PlanType } from '../models/PlanType';

export type CreateStudentRequest = {
  name: string;
  lastName: string;
  cellphoneNumber: string;
  planType: string;
  classesPerWeek: number;
  extraClasses?: number;
  paymentDay?: number;
  birthday: Date;
  admissionDate: Date;
  pathologies: string | null;
  userId: string;
}