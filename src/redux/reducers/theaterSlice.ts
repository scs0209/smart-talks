import { createSlice } from '@reduxjs/toolkit'

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
  extraReducers: (builder) => {},
})

export default theaterSlice.reducer
