import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearUser, setUser } from "../slices/AuthSlice";
import type { SigninResponse } from "../types/responses/SigninResponse.type";

export const createAuthenticatedBaseQuery = (
  path: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}${path}`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as any).auth?.user?.accessToken;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  });

  const authBaseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const refreshToken = (getState() as any).auth?.user?.refreshToken;

      if (refreshToken) {
        headers.set('Authorization', `Bearer ${refreshToken}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, SigninResponse, FetchBaseQueryError>;

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && args.url !== '/sign-in') {
      const refreshResult = await authBaseQuery(
        {
          url: '/refresh-token',
          method: 'POST',
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setUser(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearUser());
        return { error: { path: '/refresh-token', status: 401, data: { message: 'Session expired. Please log in again.' } } };
      }
    }

    return result;
  };
};
