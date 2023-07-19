import { createSlice } from '@reduxjs/toolkit'

import { createDummyTheaters, fetchTheaters } from '../actions/theater'
import { TheaterState } from '../types/theater'

const initialState: TheaterState = {
  theaters: [],
  loading: false,
  error: null,
}

const theaterSlice = createSlice({
  name: 'theater',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchTheaters 처리
    builder.addCase(fetchTheaters.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchTheaters.fulfilled, (state, action) => {
      state.loading = false
      state.theaters = action.payload
    })

    builder.addCase(fetchTheaters.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })

    // createDummyTheaters 처리
    builder.addCase(createDummyTheaters.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(createDummyTheaters.fulfilled, (state, action) => {
      state.loading = false
      state.theaters = [...state.theaters, ...action.payload]
    })

    builder.addCase(createDummyTheaters.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export default theaterSlice.reducer
