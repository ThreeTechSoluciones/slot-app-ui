import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentResponse } from "../types/responses/StudentResponse.type";
import type { PriceResponse } from "../types/responses/PriceResponse.type";
import type { PlanResponse } from "../types/responses/PlanResponse.type";
import type { Page } from "../types/responses/common/Page";
import type { SlotListResponse } from "../types/responses/SlotResponse.type";
import type { GetSlotsByDayParams } from "../types/requests/GetUserSlotsRequest.type";

export const UserService = createApi({
  reducerPath: "users",
  tagTypes: ["userStudents", "userPrices", "userPlans", "userSlots"],
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
            id: slot.startTime
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
  useGetSlotsQuery
} = UserService;
