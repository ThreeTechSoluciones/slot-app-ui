export type UpdateStudentRequest = {
  studentId: string;
  dni: number;
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
};
