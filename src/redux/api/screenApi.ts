import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Screen } from '../types/screen'

export const screenApi = createApi({
  reducerPath: 'screenApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Screen'],
  endpoints: (builder) => ({
    getScreens: builder.query<Screen[], string>({
      query: (theaterId) => ({
        url: '/screen',
        method: 'GET',
        params: {
          theaterId,
        },
      }),
      providesTags: (result, error, theaterId) =>
        result
          ? result.map(({ id }) => ({ type: 'Screen', id: id }))
          : [{ type: 'Screen', id: 'LIST' }],
    }),
    createScreen: builder.mutation<
      Screen,
      {
        screenName: string
        locationId: string
      }
    >({
      query: ({ screenName, locationId }) => ({
        url: '/screen',
        method: 'POST',
        body: {
          screenName,
          locationId,
        },
      }),
      invalidatesTags: ['Screen'],
    }),
  }),
})

export const { useGetScreensQuery, useCreateScreenMutation } = screenApi
