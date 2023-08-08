import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

export const getMovieList = createAsyncThunk(
  'movies/getMovieList',
  async () => {
    const data = await api.getMovieList()

    return data
  },
)

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }: { query: string | undefined; page: number }) => {
    const data = await api.searchMoviesAPI(query, page)
    return data
  },
)

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (id: string) => {
    const data = await api.getMovieDetailsAPI(id)
    return data
  },
)

export const getPopularMovies = createAsyncThunk(
  'movies/getPopularMovies',
  async (page: number) => {
    const data = await api.getPopularMoviesAPI(page)
    return data
  },
)
