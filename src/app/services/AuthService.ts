import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SigninResponse } from "../types/responses/SigninResponse.type";
import { setUser } from "../slices/AuthSlice";

export const AuthService = createApi({
  reducerPath: "authservice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<SigninResponse, string>({
      query: (credentials: string) => ({
        url: `/sign-in`,
        method: `POST`,
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((result) => {
          dispatch(setUser(result.data));
        })
      },
    }),
  }),
});

export const { useSigninMutation } = AuthService;
