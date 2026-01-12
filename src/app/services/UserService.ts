import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { PriceResponse } from "../types/responses/PriceResponse.type";
import type { PlanResponse } from "../types/responses/PlanResponse.type";
import type { Page } from "../types/responses/common/Page";
import type { SlotListResponse } from "../types/responses/SlotResponse.type";
import type { GetSlotsByDayParams } from "../types/requests/GetUserSlotsRequest.type";
import type { UserPreferencesResponse } from "../types/responses/UserPreferencesResponse.type";


export const UserService = createApi({
  reducerPath: "users",
  tagTypes: ["userStudents", "userPrices", "userPlans", "userSlots", "userPreferences"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUserStudents: builder.query<
      Page<StudentResponse>,
      {
        userId: string;
        filter?: string;
      }
    >({
      query: ({ userId, filter }) => {
        const params = new URLSearchParams();
        if (filter) params.append("filter", filter);
        return `/${userId}/students?${params}`;
      },
      providesTags: (result) =>
        result
          ? [
            { type: "userStudents", id: "LIST" },
            ...result.content.map(({ id }) => ({
              type: "userStudents" as const,
              id,
            })),
          ]
          : [{ type: "userStudents", id: "LIST" }],
    }),


    getUserPrices: builder.query<PriceResponse[], string>({
      query: (userId) => `${userId}/prices`,
      providesTags: (result) =>
        result
          ? [
            { type: "userPrices", id: "LIST" },
            ...result.map(({ id }) => ({ type: "userPrices" as const, id })),
          ]
          : [{ type: "userPrices", id: "LIST" }],
    }),
    getUserPlans: builder.query<PlanResponse[], string>({
      query: (userId) => `${userId}/plans`
    }),
    getUserPreferences: builder.query<UserPreferencesResponse, string>({
      query: (userId) => `${userId}/userPreferences`,
      providesTags: (_result, _error, userId) => [
        { type: "userPreferences", id: userId },
      ],
    }),
    updateSlotsCapacity: builder.mutation<void, { userId: string; capacity: number }>({
      query: ({ userId, capacity }) => ({
        url: `/${userId}/capacity`,
        method: "PATCH",
        body: { capacity },
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "userSlots", id: userId },
        { type: "userPreferences", id: userId },
      ],
    }),
    getSlots: builder.query<SlotListResponse, GetSlotsByDayParams>({
      query: ({ userId, dayOfWeek }) => ({
        url: `${userId}/slots`,
        params: { dayOfWeek },
      }),
      providesTags: (result) => {
        if (!result || !result.slots || !Array.isArray(result.slots)) {
          return [{ type: "userSlots", id: "LIST" }];
        }

        return [
          { type: "userSlots", id: "LIST" },
          ...result.slots.map((slot) => ({
            type: "userSlots" as const,
            id: slot.slotId,
          })),
        ];
      }
    }),
  }),
});

export const {
  useGetUserStudentsQuery,
  useGetUserPricesQuery,
  useGetUserPlansQuery,
  useGetSlotsQuery,
  useUpdateSlotsCapacityMutation,
  useGetUserPreferencesQuery
} = UserService;
