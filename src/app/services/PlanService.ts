import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanResponse } from "../types/responses/PlanResponse.type";
import type { CreatePlanRequest } from "../types/requests/PlansRequest/CreatePlansRequest.type";

export const PlanService = createApi({
  reducerPath: "plans",
  tagTypes: ["Plan"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/plans`,
  }),
  endpoints: (builder) => ({
    createPlan: builder.mutation<PlanResponse, CreatePlanRequest>({
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

export const { useCreatePlanMutation, useUpdatePlanPriceMutation } =
  PlanService;
