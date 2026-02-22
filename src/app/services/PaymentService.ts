import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PaymentInfoResponse } from '../types/responses/PaymentInfoResponse.type';

export const PaymentService = createApi({
  reducerPath: 'payments',
  tagTypes: ['Payments'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/payments`,
  }),
  endpoints: (builder) => ({
    getPaymentInfo: builder.query<PaymentInfoResponse, string>({
      query: (paymentId) => `/${paymentId}`,
      providesTags: (_result, _error, paymentId) => [{ type: 'Payments', id: paymentId }],
    }),
  }),
});

export const { useGetPaymentInfoQuery } = PaymentService;
