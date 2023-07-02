import { createSlice } from '@reduxjs/toolkit'
import { ShowtimesState } from '../types/showtime'
import { fetchShowtimes } from '../actions/showtime'

const initialState: ShowtimesState = {
  data: [],
  loading: false,
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
  },
})

export default showtimesSlice.reducer
