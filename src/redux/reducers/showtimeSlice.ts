import { createSlice } from '@reduxjs/toolkit'

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
  extraReducers: (builder) => {},
})

export default showtimesSlice.reducer
