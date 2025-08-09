import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PriceResponse } from "../types/responses/PriceResponse.type";

export const PriceService = createApi({
  reducerPath: "prices",
  tagTypes: ["Price"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/prices`,
  }),
  endpoints: (builder) => ({
    getPriceById: builder.query<PriceResponse, string>({
      query: (priceId) => `/${priceId}`,
      providesTags: (_result, _error, priceId) => [
        { type: "Price", id: priceId },
      ],
    }),
    updatePrice: builder.mutation<void, { priceId: string; amount: number }>({
      query: ({ priceId, amount }) => ({
        url: `/${priceId}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: (_result, _error, { priceId }) => [
        { type: "Price", id: priceId },
      ],
    }),
  }),
});
export const { useGetPriceByIdQuery, useUpdatePriceMutation } = PriceService;
