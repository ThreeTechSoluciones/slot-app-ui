import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanResponse } from "../types/responses/PlanResponse.type";

export const PlanService = createApi({
  reducerPath: "plans",
  tagTypes: ["Plan"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/plans`,
  }),
  endpoints: (builder) => ({
    getAllPlans: builder.query<PlanResponse[], void>({
      query: () => "",
      providesTags: [{ type: "Plan", id: "LIST" }],
    }),

    createPlan: builder.mutation<
      PlanResponse,
      { name: string; numberOfDays: number; price: number }
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),

    updatePlanPrice: builder.mutation<
      PlanResponse,
      { planId: string; amount: number; startDate: string }
    >({
      query: ({ planId, amount, startDate }) => ({
        url: `/${planId}/prices`,
        method: "PATCH",
        body: { amount, startDate },
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanPriceMutation,
} = PlanService;
