import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SigninResponse } from '../types/responses/SigninResponse.type';
import { setUser } from '../slices/AuthSlice';
import type { RestorePasswordResponse } from '../types/responses/RestorePasswordResponse.type';

export const AuthService = createApi({
  reducerPath: 'authservice',
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
        });
      },
    }),
    restorePassword: builder.mutation<RestorePasswordResponse, { username: string }>({
      query: (body) => ({
        url: '/restore-password',
        method: 'POST',
        body,
      }),
    }),
    validateToken: builder.mutation<void, { token: string }>({
      query: (body) => ({
        url: '/restore-password/token/validate',
        method: 'POST',
        body,
      }),
    }),
    confirmRestorePassword: builder.mutation<
      void,
      { username: string; password: string; repeatedPassword: string; token: string }
    >({
      query: (body) => ({
        url: '/restore-password/confirm',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useRestorePasswordMutation,
  useValidateTokenMutation,
  useConfirmRestorePasswordMutation,
} = AuthService;
