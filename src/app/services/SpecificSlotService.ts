import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/specific-slots`
    }),
    endpoints: (builder) => ({
        getSpecificSlotStudents: builder.query<Student, Params>({
            query: ({ specificSlotId, filter }: Params) => ({
                url: `/${specificSlotId}/students`,
                params: { filter }
            })
        })
    })
})

export const { useGetSpecificSlotStudentsQuery } = SpecificSlotService