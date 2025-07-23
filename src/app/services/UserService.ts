import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";

export const UserService = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUserStudents: builder.query<StudentResponse[], string>({
      query: (userId) => `/${userId}/students`,
    }),
  }),
});

export const { useGetUserStudentsQuery } = UserService;
