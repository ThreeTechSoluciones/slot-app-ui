export type CreateStudentRequest = {
  name: string;
  lastName: string;
  dni: string;
  cellphoneNumber: string;
  email?: string | null;
  birthday: string;
  pathologies?: string | null;
  paymentPlanName: string;
  extraClasses?: number | null | undefined;
  classPrice?: number | null | undefined;
  paymentDay?: number | undefined;
  planId: string;
  admissionDate: Date;
  userId: string;
  slotIds: string[];
};
