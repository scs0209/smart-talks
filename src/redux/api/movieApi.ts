/* eslint-disable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

const movieApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getMovieList: builder.query<any[], void>({
      query: () => '/movie-list',
    }),
    searchMovies: builder.query<
      { results: any[] },
      { query: string | undefined; page: number }
    >({
      query: ({ query, page }) =>
        `/movies/movie-search?query=${query}&page=${page}`,
    }),
    getMovieDetails: builder.query<any, string | undefined>({
      query: (id) => `/movies/movie-detail?movieId=${id}`,
    }),
    getPopularMovies: builder.query<{ results: any[] }, number>({
      query: (page) => `/movies/popular-movie?page=${page}`,
    }),
  }),
})

export const {
  useGetMovieListQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  util: { getRunningQueriesThunk },
} = movieApi

export default movieApi
