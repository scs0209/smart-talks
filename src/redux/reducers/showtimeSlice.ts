import { createSlice } from '@reduxjs/toolkit'

import { createShowtime, fetchShowtimes } from '../actions/showtime'
import { ShowtimesState } from '../types/showtime'

const initialState: ShowtimesState = {
  data: [],
  loading: false,
  error: null,
}

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowtimes.pending, (state) => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(fetchShowtimes.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = undefined
    })
    builder.addCase(fetchShowtimes.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    // createShowtime 처리
    builder.addCase(createShowtime.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(createShowtime.fulfilled, (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload]
    })

    builder.addCase(createShowtime.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default showtimesSlice.reducer
