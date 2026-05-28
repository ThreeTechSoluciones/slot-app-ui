import { createApi } from '@reduxjs/toolkit/query/react';
import type { PlanResponse } from '../types/responses/PlanResponse.type';
import type { CreatePlanRequest } from '../types/requests/PlansRequest/CreatePlansRequest.type';
import { UserService } from './UserService';
import type { UpdatePlanRequest } from '../types/requests/PlansRequest/UpdatePlanRequest';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const PlanService = createApi({
  reducerPath: 'plans',
  tagTypes: ['Plan'],
  baseQuery: createAuthenticatedBaseQuery(`${import.meta.env.VITE_BACKEND_URL}/plans`),
  endpoints: (builder) => ({
    createPlan: builder.mutation<PlanResponse, CreatePlanRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error) => [{ type: 'Plan', id: 'LIST' }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userPlans']));
      },
    }),

    updatePlan: builder.mutation<PlanResponse, UpdatePlanRequest>({
      query: ({ planId, name, numberOfDays, amount, startDate }) => ({
        url: `/${planId}`,
        method: 'PATCH',
        body: { name, numberOfDays, amount, startDate },
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Plan', id: id.planId }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userPlans']));
      },
    }),
    deletePlan: builder.mutation<void, string>({
      query: (planId) => ({
        url: `/${planId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error) => [{ type: 'Plan', id: 'LIST' }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userPlans']));
      },
    }),
  }),
});

export const { useCreatePlanMutation, useUpdatePlanMutation, useDeletePlanMutation } = PlanService;
