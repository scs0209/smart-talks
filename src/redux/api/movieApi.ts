import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const movieApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
      transformResponse: (items: { results: any[] }) => {
        return { results: items.results }
      },
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
} = movieApi

export default movieApi
