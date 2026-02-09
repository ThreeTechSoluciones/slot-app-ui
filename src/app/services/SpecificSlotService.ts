import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Student } from "../types/responses/CalendarResponse.type";
import type { FilterParams } from "../types/requests/GetCalendarViewRequest.type";

export const SpecificSlotService = createApi({
  reducerPath: "specificSlots",
  tagTypes: ["SpecificSlot"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/specific-slots`,
  }),
  endpoints: (builder) => ({
    getSpecificSlotStudents: builder.query<Student[], FilterParams>({
      query: ({ specificSlotId, filter }: FilterParams) => ({
        url: `/${specificSlotId}/students`,
        params: { filter },
      }),
      providesTags: (_result, _error, { specificSlotId }) => [
        { type: "SpecificSlot", id: specificSlotId },
      ],
    }),
  }),
});

export const { useGetSpecificSlotStudentsQuery } = SpecificSlotService;
