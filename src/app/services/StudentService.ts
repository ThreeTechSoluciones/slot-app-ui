import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserService } from "./UserService";

export const StudentService = createApi({
  reducerPath: "students",
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
  }),
});

export const { useDeleteStudentMutation } = StudentService;
