import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const theaterApi = createApi({
  reducerPath: 'theaterApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Theater'],
  endpoints: (builder) => ({
    getTheaters: builder.query<any[], void>({
      query: () => '/theater',
      providesTags: ['Theater'],
    }),
    createTheater: builder.mutation<any, { name: string; address: string }>({
      query: ({ name, address }) => ({
        url: '/theater',
        method: 'POST',
        body: { name, address },
      }),
      invalidatesTags: ['Theater'],
    }),
  }),
})

export const { useGetTheatersQuery, useCreateTheaterMutation } = theaterApi
