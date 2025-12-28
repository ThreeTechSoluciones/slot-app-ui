import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserService } from "./UserService";
import type { CreateStudentRequest } from "../types/requests/CreateStudentRequest.type";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { StudentDetailResponse } from "../types/responses/StudentDetailResponse.type";
import type { UpdateStudentRequest } from "../types/requests/UpdateStudentRequest.type";
import type { StudentMonthlyFeeResponse } from "../types/responses/StudentMonthlyFee.type";


export const StudentService = createApi({
  reducerPath: "students",
  tagTypes: ["Student", "MonthlyFees"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/students`,
  }),
  endpoints: (builder) => ({
    deleteStudent: builder.mutation<void, string>({
      query: (studentId) => ({
        url: `/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Student", id }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(["userStudents"]));
      },
    }),

    createStudent: builder.mutation<StudentResponse, CreateStudentRequest>({
      query: (request: CreateStudentRequest) => ({
        url: "",
        method: "POST",
        body: request,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(["userStudents"]));
      },
    }),
    getStudentMonthlyFees: builder.query<
      StudentMonthlyFeeResponse[],
      {
        studentId: string;
        month?: string;
        expirationDate?: string;
        status?: string;
        paymentId?: string;
      }
    >({
      query: ({ studentId, month, expirationDate, status }) => {
        const params = new URLSearchParams();
        if (month) params.append("month", month);
        if (expirationDate) params.append("expirationDate", expirationDate);
        if (status) params.append("status", status);
        return `/${studentId}/monthly-fees?${params.toString()}`;
      },
      providesTags: (_result, _error, { studentId }) => [
        { type: "MonthlyFees", id: studentId },
      ],
    }),

    getStudentById: builder.query<StudentDetailResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Student", id }],
    }),

    updateStudent: builder.mutation<void, UpdateStudentRequest>({
      query: ({ studentId, ...payload }) => ({
        url: `/${studentId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { studentId }) => [
        { type: "Student", id: studentId },
      ],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(["userStudents"]));
      },
    }),
    activateStudent: builder.mutation<void, string>({
      query: (studentId) => ({
        url: `/${studentId}/activate`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Student", id }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(["userStudents"]));
      },
    }),
  }),
});

export const {
  useDeleteStudentMutation,
  useCreateStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useActivateStudentMutation,
  useGetStudentMonthlyFeesQuery,
} = StudentService;
