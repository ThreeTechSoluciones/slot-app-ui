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
        filter?: string;
      }
    >({
      query: ({ userId, filter }) => {
        const params = new URLSearchParams();

        if (filter) params.append("filter", filter);

        return `/${userId}/students?${params.toString()}`;
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
