export type CreateStudentRequest = {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: Date;
  pathologies: string | null;
  paymentPlanName:string;
  extraClasses?: number|undefined;
  classPrice?:number|undefined;
  paymentDay?: number | undefined;
  planId: string;
  admissionDate: Date;
  userId: string;
};
