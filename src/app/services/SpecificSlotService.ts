import { createApi } from '@reduxjs/toolkit/query/react';
import type { Student } from '../types/responses/CalendarResponse.type';
import type { FilterParams } from '../types/requests/GetCalendarViewRequest.type';
import { UserService } from './UserService';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const SpecificSlotService = createApi({
  reducerPath: 'specificSlots',
  tagTypes: ['SpecificSlot'],
  baseQuery: createAuthenticatedBaseQuery(`/specific-slots`),
  endpoints: (builder) => ({
    getSpecificSlotStudents: builder.query<Student[], FilterParams>({
      query: ({ specificSlotId, filter }: FilterParams) => ({
        url: `/${specificSlotId}/students`,
        params: { filter },
      }),
      providesTags: (_result, _error, { specificSlotId }) => [
        { type: 'SpecificSlot', id: specificSlotId },
      ],
    }),
    cancelSpecificSlot: builder.mutation<void, { specificSlotId: string }>({
      query: ({ specificSlotId }) => ({
        url: `/${specificSlotId}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { specificSlotId }) => [
        { type: 'SpecificSlot', id: specificSlotId },
      ],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(UserService.util.invalidateTags(['userCalendar', 'userSlots', 'userStudents']));
      },
    }),
  }),
});

export const { useGetSpecificSlotStudentsQuery, useCancelSpecificSlotMutation } =
  SpecificSlotService;
