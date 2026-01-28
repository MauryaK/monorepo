import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BaseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});