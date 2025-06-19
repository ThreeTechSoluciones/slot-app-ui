import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SigninResponse } from '../types/responses/SigninResponse.type';

export const AuthService = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth` }),
  endpoints: (builder) => ({
    signin: builder.mutation<SigninResponse, string> ({
      query: (credentials: string) => ({
        url:  `/sign-in`,
        method: `POST`, 
        headers:{
          "Authorization": `Basic ${credentials}`
        }
      })
    })
  })
})

export const { useSigninMutation } = AuthService 

