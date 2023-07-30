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
        if (action.meta.arg.page === 1) {
          state.searchResult = action.payload
        } else if (state.searchResult !== null) {
          state.searchResult = [...state.searchResult, ...action.payload]
        }
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.searchResult = null
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
        if (state.data === null) {
          state.data = action.payload
        } else {
          state.data.push(...action.payload)
        }
        state.currentPage += 1 // 이 줄을 추가하세요
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.data = null
      })
  },
})

export const moviesReducer = moviesSlice.reducer
