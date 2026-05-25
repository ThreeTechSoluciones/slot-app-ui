import { createApi } from '@reduxjs/toolkit/query/react';
import { createAuthenticatedBaseQuery } from './baseQuery';
import { PlanService } from './PlanService';
import { UserService } from './UserService';

export const PriceService = createApi({
  reducerPath: 'prices',
  tagTypes: ['userPrices'],
  baseQuery: createAuthenticatedBaseQuery(`${import.meta.env.VITE_BACKEND_URL}/prices`),
  endpoints: (builder) => ({
    deletePrice: builder.mutation<void, { priceId: string; planId: string }>({
      query: ({ priceId: priceId }) => ({
        url: `/${priceId}`,
        method: 'DELETE',
      }),

      async onQueryStarted({ planId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags([{ type: 'userPlans', id: 'LIST' }]));
      },
    }),
  }),
});

export const { useDeletePriceMutation } = PriceService;
