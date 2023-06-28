import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query: string) => {
    const data = await api.searchMoviesAPI(query)
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
    console.log('getpopular: ', data)
    return data
  },
)
