import { createSlice } from '@reduxjs/toolkit'

import { ScreenState } from '../types/screen'

const initialState: ScreenState = {
  screens: [],
  loading: false,
  error: null,
}

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default screenSlice.reducer
