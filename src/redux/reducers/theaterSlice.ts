import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Theater, TheaterState } from '../types/theater'

const initialState: TheaterState = {
  theaters: [],
}

const theaterSlice = createSlice({
  name: 'theater',
  initialState,
  reducers: {
    setTheaters: (state, action: PayloadAction<Array<Theater>>) => {
      state.theaters = action.payload
    },
    addTheaters: (state, action: PayloadAction<Array<Theater>>) => {
      state.theaters = [...state.theaters, ...action.payload]
    },
  },
})

export const { setTheaters, addTheaters } = theaterSlice.actions

export default theaterSlice.reducer
