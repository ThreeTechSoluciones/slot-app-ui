export interface StudentResponse {
  id: string;
  dni: number | string;
  name: string;
  lastname: string;
  status: string;
  isActive: boolean;
  daysToRecover: number;
}
