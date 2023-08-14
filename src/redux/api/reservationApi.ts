import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReservationData } from '../types/reservation'

export const reservationApi = createApi({
  reducerPath: 'reservation',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Reservation'],
  endpoints: (builder) => ({
    saveReservation: builder.mutation({
      query: (reservationData: ReservationData) => ({
        url: '/reservation',
        method: 'POST',
        body: reservationData,
      }),
      invalidatesTags: ['Reservation'],
    }),
    getReservationsByUser: builder.query({
      query: (userId: string) => {
        return {
          url: `/reservation?user_id=${userId}`,
        }
      },
      providesTags: ['Reservation'],
    }),
    deleteReservation: builder.mutation({
      query: (reservationId: string) => ({
        url: `/reservation?reservation_id=${reservationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reservation'],
    }),
  }),
})

export const {
  useSaveReservationMutation,
  useGetReservationsByUserQuery,
  useDeleteReservationMutation,
} = reservationApi
