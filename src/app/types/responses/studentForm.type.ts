export type StudentFormMode = 'create' | 'reactivate';

export interface NewStudentLocationState {
  mode?: StudentFormMode;
  studentId?: string;
}
