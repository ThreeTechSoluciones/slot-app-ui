import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserService } from "./UserService";

interface Student {
  id: string;
  fullName: string;
  status: string;
}

interface Params {
  specificSlotId: string;
  filter: string;
}

export const SpecificSlotService = createApi({
  reducerPath: "specificSlots",
  tagTypes: ["SpecificSlot"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/specific-slots`,
  }),
  endpoints: (builder) => ({
    getSpecificSlotStudents: builder.query<Student, Params>({
      query: ({ specificSlotId, filter }: Params) => ({
        url: `/${specificSlotId}/students`,
        params: { filter },
      }),
      providesTags: (_result, _error, { specificSlotId }) => [
        { type: "SpecificSlot", id: specificSlotId },
      ],
    }),
    cancelSpecificSlot: builder.mutation<void, { specificSlotId: string }>({
      query: ({ specificSlotId }) => ({
        url: `/${specificSlotId}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { specificSlotId }) => [
        { type: "SpecificSlot", id: specificSlotId },
      ],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(
          UserService.util.invalidateTags(["userCalendar", "userSlots"]),
        );
      },
    }),
  }),
});

export const {
  useGetSpecificSlotStudentsQuery,
  useCancelSpecificSlotMutation,
} = SpecificSlotService;
