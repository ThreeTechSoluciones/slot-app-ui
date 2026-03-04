export interface ActivateStudentRequest {
  paymentPlanName: string;
  paymentDay?: number;
  extraClasses?: number;
  classPrice?: number;
  studentId: string;
  planId: string;
  slotIds: string[];
}
