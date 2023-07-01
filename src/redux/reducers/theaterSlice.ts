import { createSlice } from '@reduxjs/toolkit'
import { TheaterState } from '../types/theater'
import {
  createDummyTheaters,
  fetchScreens,
  fetchTheaters,
} from '../actions/theater'

const initialState: TheaterState = {
  theaters: [],
  screens: [],
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

    builder.addCase(fetchScreens.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchScreens.fulfilled, (state, action) => {
      state.loading = false
      state.screens = action.payload
    })

    builder.addCase(fetchScreens.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export default theaterSlice.reducer
