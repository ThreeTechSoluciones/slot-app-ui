
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateSlotRequest } from "../types/requests/CreateSlotRequest.type";
import { UserService } from "./UserService";


export const SlotService = createApi({
    reducerPath: "slots",
    tagTypes: ["Slots"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/slots`,
    }),
    endpoints: (builder) => ({
        createSlot: builder.mutation<void, CreateSlotRequest>({
            query: (request: CreateSlotRequest) => ({
                url: ``,
                method: "POST",
                body: request,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                await queryFulfilled;
                dispatch(UserService.util.invalidateTags([{ type: "userSlots", id: "LIST" }]));
            },
        }),
        updateSlot: builder.mutation<void, { slotId: string; startTime: string }>({
            query: ({ slotId, startTime }) => ({
                url: `${slotId}`,
                method: "PATCH",
                body: { startTime },
            }),
            async onQueryStarted({ slotId }, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(
                    UserService.util.invalidateTags([{ type: "userSlots", id: slotId }])
                );
            },
        }),
        deleteSlot: builder.mutation<void, { slotId: string }>({
            query: ({ slotId }) => ({
                url: `/${slotId}`,
                method: "DELETE",
            }),
            async onQueryStarted({ slotId }, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(
                    UserService.util.invalidateTags([{ type: "userSlots", id: slotId }])
                );
            },
        }),
    })
});

export const {
    useCreateSlotMutation,
    useUpdateSlotMutation,
    useDeleteSlotMutation,
} = SlotService;
