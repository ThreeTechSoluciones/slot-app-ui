export type CreateStudentRequest = {
  dni: string;
  name: string;
  lastName: string;
  cellphoneNumber: string;
  planType: string;
  classesPerWeek: number;
  extraClasses?: number;
  paymentDay?: number | null;
  birthday: Date;
  admissionDate: Date;
  pathologies: string | null;
  userId: string;
};
