import { createSlice } from '@reduxjs/toolkit'

import {
  getMovieDetails,
  getPopularMovies,
  searchMovies,
} from '../actions/movie'
import initialState from '../types/movie/state'

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.data = action.payload
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.data = null
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.movieDetails = action.payload
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.movieDetails = null
      })
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.data = action.payload
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.data = null
      })
  },
})

export const moviesReducer = moviesSlice.reducer
