import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { PriceResponse } from "../types/responses/PriceResponse.type";

export const UserService = createApi({
  reducerPath: "users",
  tagTypes: ["userStudents", "userPrices"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    getUserStudents: builder.query<StudentResponse[], string>({
      query: (userId) => `/users/${userId}/students`,
      providesTags: ["userStudents"],
    }),

    getUserPrices: builder.query<PriceResponse[], string>({
      query: (userId) => `/users/${userId}/prices`,
      providesTags: (result) =>
        result
          ? [
              { type: "userPrices", id: "LIST" },
              ...result.map(({ id }) => ({ type: "userPrices" as const, id })),
            ]
          : [{ type: "userPrices", id: "LIST" }],
    }),

    updatePrice: builder.mutation<void, { priceId: string; amount: number }>({
      query: ({ priceId, amount }) => ({
        url: `/prices/${priceId}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: (_result, _error, { priceId }) => [
        { type: "userPrices", id: priceId },
        { type: "userPrices", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUserStudentsQuery,
  useGetUserPricesQuery,
  useUpdatePriceMutation,
} = UserService;
