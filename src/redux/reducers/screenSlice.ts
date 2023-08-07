import { createSlice } from '@reduxjs/toolkit'

import { createScreen } from '../actions/screen'
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
  extraReducers: (builder) => {
    // createScreen 처리
    builder.addCase(createScreen.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(createScreen.fulfilled, (state, action) => {
      state.loading = false
      state.screens = [...state.screens, action.payload]
    })

    builder.addCase(createScreen.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export default screenSlice.reducer
