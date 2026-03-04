import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Creates an authenticated base query with Authorization header
 * @param baseUrl - The base URL for the API endpoint
 * @returns Configured fetchBaseQuery instance with automatic token injection
 */
export const createAuthenticatedBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as any).auth?.user?.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  });
