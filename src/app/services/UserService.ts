import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { PriceResponse } from "../types/responses/PriceResponse.type";
import type { PlanResponse } from "../types/responses/PlanResponse.type";
import type { Page } from "../types/responses/common/Page";
import type { SlotListResponse } from "../types/responses/SlotResponse.type";
import type { SortConfig } from "../types/sort";
import type { UserPreferencesResponse } from "../types/responses/UserPreferencesResponse.type";
import type { CalendarResponse } from "../types/responses/CalendarResponse.type";
import type { CalendarParams } from "../types/requests/GetCalendarViewRequest.type";
import type { GetSlotsByDayParams } from "../types/requests/GetUserSlotsRequest.type";

export const UserService = createApi({
  reducerPath: "users",
  tagTypes: [
    "userStudents",
    "userPrices",
    "userPlans",
    "userSlots",
    "userPreferences",
    "userCalendar",
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
        page: number;
        size: number;
        status?: string;
        isActive?: boolean;
        sort?: SortConfig | SortConfig[];
        filterByAbsences?: boolean;
      }
    >({
      query: ({
        userId,
        filter,
        page,
        size,
        status,
        isActive,
        sort,
        filterByAbsences,
      }) => {
        let sortParams: string | string[] | undefined;
        if (sort) {
          sortParams = Array.isArray(sort)
            ? sort.map((s) => `${s.property},${s.direction}`)
            : `${sort.property},${sort.direction}`;
        }
        return {
          url: `/${userId}/students`,
          params: {
            page,
            size,
            filter,
            status,
            isActive,
            sort: sortParams,
            filterByAbsences,
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
      { slots: SlotListResponse[]; day: SlotListResponse | null },
      GetSlotsByDayParams
    >({
      query: ({ userId, dayOfWeek }) => ({
        url: `${userId}/slots`,
        params: { dayOfWeek },
      }),
      transformResponse: (response: SlotListResponse[]) => ({
        slots: response,
        day: response.length > 0 ? response[0] : null,
      }),
      providesTags: (result) => {
        if (!result?.slots || result.slots.length === 0) {
          return [{ type: "userSlots" as const, id: "LIST" }];
        }
        const allSlots = result.slots.flatMap((day) => day.slots || []);
        return [
          { type: "userSlots" as const, id: "LIST" },
          ...allSlots.map((slot) => ({
            type: "userSlots" as const,
            id: slot.id,
          })),
        ];
      },
    }),
    getCalendarView: builder.query<CalendarResponse, CalendarParams>({
      query: ({ userId, date, typeOfView }) => ({
        url: `${userId}/calendar`,
        params: { date, typeOfView },
      }),
      providesTags: ["userCalendar"],
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
  useGetCalendarViewQuery,
} = UserService;
