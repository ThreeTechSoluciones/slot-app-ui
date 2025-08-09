import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserService } from "./UserService";
import type { CreateStudentRequest } from "../types/requests/CreateStudentRequest.type";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { StudentDetailResponse } from "../types/responses/StudentDetailResponse.type";
import type { UpdateStudentRequest } from "../types/requests/UpdateStudentRequest.type";

export const StudentService = createApi({
  reducerPath: "students",
  tagTypes: ["Student"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/students`,
  }),
  endpoints: (builder) => ({
    deleteStudent: builder.mutation<void, string>({
      query: (studentId) => ({
        url: `/${studentId}`,
        method: "DELETE",
      }),
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
    }),
    getStudentById: builder.query<StudentDetailResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Student", id }],
    }),

    updateStudent: builder.mutation<void, UpdateStudentRequest>({
      query: ({ studentId, body }) => ({
        url: `/${studentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { studentId }) => [
        { type: "Student", id: studentId },
      ],
    }),
  }),
});

export const {
  useDeleteStudentMutation,
  useCreateStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} = StudentService;
