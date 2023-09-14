/* eslint-disable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { BASE_URL } from './client'

const movieApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getMovieList: builder.query<any[], void>({
      query: () => '/movie',
    }),
    searchMovies: builder.query<
      { results: any[] },
      { query: string | undefined; page: number }
    >({
      query: ({ query, page }) => `/movies/search?query=${query}&page=${page}`,
    }),
    getMovieDetails: builder.query<any, string | undefined>({
      query: (id) => `/movies/details?movieId=${id}`,
    }),
    getPopularMovies: builder.query<{ results: any[] }, number>({
      query: (page) => `/movies/popular?page=${page}`,
    }),
    getTrendingMovies: builder.query<{ results: any[] }, string | undefined>({
      query: (timeWindow) => `/movies/trending?timeWindow=${timeWindow}`,
    }),
  }),
})

export const {
  useGetMovieListQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  util: { getRunningQueriesThunk },
} = movieApi

export default movieApi
