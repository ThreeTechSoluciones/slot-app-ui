import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PriceResponse } from "../types/responses/PriceResponse.type";

export const PriceService = createApi({
  reducerPath: "prices",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/prices`,
  }),
  tagTypes: ["Price"],
  endpoints: (builder) => ({
    updatePrice: builder.mutation<void, { priceId: string; amount: number }>({
      query: ({ priceId, amount }) => ({
        url: `/${priceId}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: (_result, _error, { priceId }) => [
        { type: "Price", id: priceId },
        { type: "Price", id: "LIST" },
      ],
    }),
  }),
});

export const UserPriceService = createApi({
  reducerPath: "userPrices",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  tagTypes: ["Price"],
  endpoints: (builder) => ({
    getUserPrices: builder.query<PriceResponse[], string>({
      query: (userId) => `/${userId}/prices`,
      providesTags: (result) =>
        result
          ? [
              { type: "Price" as const, id: "LIST" },
              ...result.map((price) => ({
                type: "Price" as const,
                id: price.id,
              })),
            ]
          : [{ type: "Price" as const, id: "LIST" }],
    }),
  }),
});

export const { useUpdatePriceMutation } = PriceService;
export const { useGetUserPricesQuery } = UserPriceService;
