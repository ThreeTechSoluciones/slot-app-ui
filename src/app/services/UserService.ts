import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { PriceResponse } from "../types/responses/PriceResponse.type";

export const UserService = createApi({
  reducerPath: "users",
  tagTypes: ["userStudents", "userPrices"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUserStudents: builder.query<StudentResponse[], string>({
      query: (userId) => `${userId}/students`,
      providesTags: ["userStudents"],
    }),

    getUserPrices: builder.query<PriceResponse[], string>({
      query: (userId) => `${userId}/prices`,
      providesTags: (result) =>
        result
          ? [
              { type: "userPrices", id: "LIST" },
              ...result.map(({ id }) => ({ type: "userPrices" as const, id })),
            ]
          : [{ type: "userPrices", id: "LIST" }],
    }),
    getStudentsByFilter: builder.query<
      StudentResponse[],
      {
        userId: string;
        studentName?: string;
        studentLastname?: string;
        studentDni?: string;
      }
    >({
      query: ({ userId, studentName, studentLastname, studentDni }) => {
        const filters = new URLSearchParams();

        if (studentName) filters.append("studentName", studentName);
        if (studentLastname) filters.append("studentLastname", studentLastname);
        if (studentDni) filters.append("studentDni", studentDni);

        return `/${userId}/students?${filters.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              { type: "userStudents", id: "LIST" },
              ...result.map(({ id }) => ({
                type: "userStudents" as const,
                id,
              })),
            ]
          : [{ type: "userStudents", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserStudentsQuery,
  useGetUserPricesQuery,
  useGetStudentsByFilterQuery,
} = UserService;
