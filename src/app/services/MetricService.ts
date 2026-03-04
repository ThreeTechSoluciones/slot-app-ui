import { createApi } from '@reduxjs/toolkit/query/react';
import type { PaymentMetrics, StudentSummary } from '../types/responses/MetricResponse';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const MetricService = createApi({
  reducerPath: 'metrics',
  tagTypes: ['Metric'],
  baseQuery: createAuthenticatedBaseQuery(`${import.meta.env.VITE_BACKEND_URL}/metrics`),
  endpoints: (builder) => ({
    getStudentPaymentMetrics: builder.query<PaymentMetrics, { studentId: string }>({
      query: ({ studentId }) => ({
        url: `/student-payments`,
        method: 'GET',
        params: { studentId },
      }),
      providesTags: [{ type: 'Metric', id: 'Payment' }],
    }),
    getStudentSummary: builder.query<StudentSummary, void>({
      query: () => ({
        url: `/students-summary`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Metric', id: 'Summary' }],
    }),
  }),
});

export const { useGetStudentPaymentMetricsQuery, useGetStudentSummaryQuery } = MetricService;
