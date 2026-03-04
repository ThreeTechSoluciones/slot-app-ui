import { createApi } from '@reduxjs/toolkit/query/react';
import { StudentService } from './StudentService';
import { MetricService } from './MetricService';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const MonthlyFeeService = createApi({
  reducerPath: 'monthlyFees',
  tagTypes: ['MonthlyFees'],
  baseQuery: createAuthenticatedBaseQuery(`${import.meta.env.VITE_BACKEND_URL}/monthly-fees`),
  endpoints: (builder) => ({
    updateMonthlyFee: builder.mutation<void, { feeId: string; studentId: string }>({
      query: ({ feeId }) => ({
        url: `/${feeId}/pay`,
        method: 'POST',
      }),
      async onQueryStarted({ studentId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(StudentService.util.invalidateTags([{ type: 'MonthlyFees', id: studentId }]));
        dispatch(MetricService.util.invalidateTags([{ type: 'Metric', id: 'Payment' }]));
      },
    }),
  }),
});

export const { useUpdateMonthlyFeeMutation } = MonthlyFeeService;
