import type { CreateStudentRequest } from "./CreateStudentRequest.type";

type UpdateStudentRequest = {
  studentId: string;
  body: CreateStudentRequest;
};
export type { UpdateStudentRequest };
