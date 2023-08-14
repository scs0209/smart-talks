import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const showtimeApi = createApi({
  reducerPath: 'showtime',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Showtime'],
  endpoints: (builder) => ({
    getShowtimes: builder.query({
      query: ({ movieId, locationId, screenId }) => {
        return {
          url: '/showtime',
          params: {
            movieId,
            locationId,
            screenId,
          },
        }
      },
      providesTags: ['Showtime'],
    }),
    createShowtime: builder.mutation({
      query: (showtime) => {
        return {
          url: '/showtime',
          method: 'POST',
          body: showtime,
        }
      },
      invalidatesTags: ['Showtime'],
    }),
  }),
})

export const { useGetShowtimesQuery, useCreateShowtimeMutation } = showtimeApi
