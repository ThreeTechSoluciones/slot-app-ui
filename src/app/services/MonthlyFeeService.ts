import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentService } from "./StudentService";

export const MonthlyFeeService = createApi({
  reducerPath: "monthlyFees",
  tagTypes: ["MonthlyFees"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/monthly-fees`,
  }),
  endpoints: (builder) => ({
    updateMonthlyFee: builder.mutation<
      void,
      { feeId: string; studentId: string }
    >({
      query: ({ feeId }) => ({
        url: `/${feeId}/pay`,
        method: "POST",
      }),
      async onQueryStarted({ studentId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          StudentService.util.invalidateTags([
            { type: "MonthlyFees", id: studentId },
          ])
        );
      },
    }),
  }),
});

export const { useUpdateMonthlyFeeMutation } = MonthlyFeeService;
