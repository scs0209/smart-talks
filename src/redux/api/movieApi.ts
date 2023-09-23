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
    getMovieDetails: builder.query<
      any,
      { mediaType: string | undefined; id: string | undefined }
    >({
      query: ({ mediaType, id }) =>
        `/movies/details?mediaType=${mediaType}&id=${id}`,
    }),
    getPopularMovies: builder.query<{ results: any[] }, number>({
      query: (page) => `/movies/popular?page=${page}`,
    }),
    getPopularsMovies: builder.query<{ results: any[] }, string | undefined>({
      query: (mediaType) => `/movies/populars?mediaType=${mediaType}`,
    }),
    getTrendingMovies: builder.query<{ results: any[] }, string | undefined>({
      query: (timeWindow) => `/movies/trending?timeWindow=${timeWindow}`,
    }),
    getTopRatedMovies: builder.query<{ results: any[] }, string | undefined>({
      query: (mediaType) => `/movies/top-rated?mediaType=${mediaType}`,
    }),
    getGenres: builder.query<{ results: any[] }, void>({
      query: () => `/movies/genres`,
    }),
    discoverMovies: builder.query<
      { results: any[] },
      { mediaType?: string | string[]; genreId?: string | null; page?: number }
    >({
      query: ({ mediaType, genreId, page = 1 }) =>
        `/movies/explore?mediaType=${mediaType}&genreId=${genreId}&page=${page}`,
    }),
    getGenre: builder.query<{ results: any[] }, string | string[] | undefined>({
      query: (mediaType) => `/movies/genre?mediaType=${mediaType}`,
    }),
  }),
})

export const {
  useGetMovieListQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
  useGetPopularsMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetGenresQuery,
  useDiscoverMoviesQuery,
  useGetGenreQuery,
  util: { getRunningQueriesThunk },
} = movieApi

export default movieApi
