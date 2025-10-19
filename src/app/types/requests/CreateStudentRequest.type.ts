export type CreateStudentRequest = {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  birthday: string;
  pathologies?: string | null;
  paymentPlanName:string;
  extraClasses?: number|null|undefined;
  classPrice?:number|null|undefined;
  paymentDay?: number |undefined;
  planId: string;
  admissionDate: Date;
  userId: string;
};
