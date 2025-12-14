import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlanResponse } from "../types/responses/PlanResponse.type";
import type { CreatePlanRequest } from "../types/requests/PlansRequest/CreatePlansRequest.type";
import type { UpdatePlanPriceRequest } from "../types/requests/PlansRequest/UpdatePlanPriceRequest.type";
import { UserService } from "./UserService";

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(["userPlans"]));
      },
    }),

    updatePlanPrice: builder.mutation<PlanResponse, UpdatePlanPriceRequest>({
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
