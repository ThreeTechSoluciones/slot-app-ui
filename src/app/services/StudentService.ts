import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";

export const StudentService = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/students`,
  }),
  endpoints: (builder) => ({
    deleteStudent: builder.mutation<StudentResponse, string>({
      query: (studentId) => ({
        url: `/${studentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteStudentMutation } = StudentService;
