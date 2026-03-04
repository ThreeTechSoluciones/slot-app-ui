import { createApi } from '@reduxjs/toolkit/query/react';
import type { CreateSlotRequest } from '../types/requests/CreateSlotRequest.type';
import { UserService } from './UserService';
import { createAuthenticatedBaseQuery } from './baseQuery';

export const SlotService = createApi({
  reducerPath: 'slots',
  tagTypes: ['Slots'],
  baseQuery: createAuthenticatedBaseQuery(`${import.meta.env.VITE_BACKEND_URL}/slots`),
  endpoints: (builder) => ({
    createSlot: builder.mutation<void, CreateSlotRequest>({
      query: (request: CreateSlotRequest) => ({
        url: ``,
        method: 'POST',
        body: request,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          UserService.util.invalidateTags([{ type: 'userSlots' }, { type: 'userCalendar' }]),
        );
      },
    }),
    updateSlot: builder.mutation<void, { slotId: string; startTime: string }>({
      query: ({ slotId, startTime }) => ({
        url: `${slotId}`,
        method: 'PATCH',
        body: { startTime },
      }),
      async onQueryStarted({ slotId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          UserService.util.invalidateTags([
            { type: 'userSlots', id: slotId },
            { type: 'userCalendar' },
          ]),
        );
      },
    }),
    deleteSlot: builder.mutation<void, { slotId: string }>({
      query: ({ slotId }) => ({
        url: `/${slotId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ slotId }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          UserService.util.invalidateTags([
            { type: 'userSlots', id: slotId },
            { type: 'userCalendar' },
          ]),
        );
      },
    }),
  }),
});

export const { useCreateSlotMutation, useUpdateSlotMutation, useDeleteSlotMutation } = SlotService;
