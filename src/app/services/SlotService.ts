
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateSlotRequest } from "../types/requests/CreateSlotRequest.type";


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
                dispatch(SlotService.util.invalidateTags(["Slots"]));
            },
        }),
    })
});

export const {
    useCreateSlotMutation,
} = SlotService;
