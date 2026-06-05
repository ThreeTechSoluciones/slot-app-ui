import { createApi } from '@reduxjs/toolkit/query/react';
import type { PaymentInfoResponse } from '../types/responses/PaymentInfoResponse.type';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const PaymentService = createApi({
  reducerPath: 'payments',
  tagTypes: ['Payments'],
  baseQuery: createAuthenticatedBaseQuery(`/payments`),
  endpoints: (builder) => ({
    getPaymentInfo: builder.query<PaymentInfoResponse, string>({
      query: (paymentId) => `/${paymentId}`,
      providesTags: (_result, _error, paymentId) => [{ type: 'Payments', id: paymentId }],
    }),
  }),
});

export const { useGetPaymentInfoQuery } = PaymentService;
