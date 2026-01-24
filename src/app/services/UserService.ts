import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { PriceResponse } from "../types/responses/PriceResponse.type";
import type { PlanResponse } from "../types/responses/PlanResponse.type";
import type { Page } from "../types/responses/common/Page";
import type { SlotListResponse } from "../types/responses/SlotResponse.type";
import type { SortConfig } from "../types/sort";
import type { UserPreferencesResponse } from "../types/responses/UserPreferencesResponse.type";

export const UserService = createApi({
  reducerPath: "users",
  tagTypes: [
    "userStudents",
    "userPrices",
    "userPlans",
    "userSlots",
    "userPreferences",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUserStudents: builder.query<
      Page<StudentResponse>,
      {
        userId: string;
        filter?: string;
        status?: string;
        isActive?: boolean;
        sort?: SortConfig | SortConfig[];
      }
    >({
      query: ({ userId, filter, status, isActive, sort }) => {
        let sortParams: string | string[] | undefined;
        if (sort) {
          sortParams = Array.isArray(sort)
            ? sort.map((s) => `${s.property},${s.direction}`)
            : `${sort.property},${sort.direction}`;
        }
        return {
          url: `/${userId}/students`,
          params: {
            filter,
            status,
            isActive,
            sort: sortParams,
          },
        };
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
    getUserPlans: builder.query<
      PlanResponse[],
      { userId: string; planName?: string }
    >({
      query: ({ userId, planName }) => ({
        url: `/${userId}/plans`,
        params: { planName },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "userPlans", id: "LIST" },
              ...result.map(({ id }) => ({ type: "userPlans" as const, id })),
            ]
          : [{ type: "userPlans", id: "LIST" }],
    }),
    getUserPreferences: builder.query<UserPreferencesResponse, string>({
      query: (userId) => `${userId}/userPreferences`,
      providesTags: (_result, _error, userId) => [
        { type: "userPreferences", id: userId },
      ],
    }),
    updateSlotsCapacity: builder.mutation<
      void,
      { userId: string; capacity: number }
    >({
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
    getSlots: builder.query<
      SlotListResponse[],
      { userId: string; dayOfWeek?: string }
    >({
      query: ({ userId, dayOfWeek }) => ({
        url: `${userId}/slots`,
        params: { dayOfWeek },
      }),
      providesTags: (result) => {
        if (!result || !Array.isArray(result) || result.length === 0) {
          return [{ type: "userSlots", id: "LIST" }];
        }
        const allSlots = result.flatMap((day) => day.slots || []);
        return [
          { type: "userSlots", id: "LIST" },
          ...allSlots.map((slot) => ({
            type: "userSlots" as const,
            id: slot.id,
          })),
        ];
      },
    }),
  }),
});

export const {
  useGetUserStudentsQuery,
  useGetUserPricesQuery,
  useGetUserPlansQuery,
  useGetSlotsQuery,
  useUpdateSlotsCapacityMutation,
  useGetUserPreferencesQuery,
} = UserService;
