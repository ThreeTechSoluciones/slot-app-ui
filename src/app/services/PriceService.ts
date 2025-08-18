import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserService } from "./UserService";

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
      async onQueryStarted({ priceId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          UserService.util.invalidateTags([{ type: "userPrices", id: priceId }])
        );
      },
    }),
  }),
});

export const { useUpdatePriceMutation } = PriceService;
