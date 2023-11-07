import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const favoriteApi = createApi({
  reducerPath: 'favorite',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getFavorites: builder.query<any[], string | undefined>({
      query: (userId) => `/movies/favorite?userId=${userId}`,
    }),
    addFavorite: builder.mutation<any, Partial<any>>({
      query: ({ userId, movieId, mediaType }) => ({
        url: `/movies/favorite`,
        method: 'PATCH',
        body: {
          userId,
          movieId,
          mediaType,
          action: 'add',
        },
      }),
    }),
    removeFavorite: builder.mutation<any, Partial<any>>({
      query: ({ userId, movieId }) => ({
        url: `/movies/favorite`,
        method: 'PATCH',
        body: {
          userId,
          movieId,
          action: 'remove',
        },
      }),
    }),
  }),
})

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi

export default favoriteApi
