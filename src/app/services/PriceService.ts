import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PriceService = createApi({
  reducerPath: "prices",
  tagTypes: ["userPrices"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/prices`,
  }),
  endpoints: (builder) => ({
    updatePrice: builder.mutation<void, { priceId: string; amount: number }>({
      query: ({ priceId, amount }) => ({
        url: `${priceId}`,
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

export const { useUpdatePriceMutation } = PriceService;
