
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
    })
});

export const {
    useCreateSlotMutation,
} = SlotService;
