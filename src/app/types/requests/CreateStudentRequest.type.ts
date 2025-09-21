export type CreateStudentRequest = {
  dni: string;
  name: string;
  lastName: string;
  cellphoneNumber: string;
  planId: string;
  paymentPlanName:string;
  extraClasses?: number|undefined;
  classPrice?:number|undefined;
  paymentDay?: number | undefined;
  birthday: Date;
  admissionDate: Date;
  pathologies: string | null;
  userId: string;
};
