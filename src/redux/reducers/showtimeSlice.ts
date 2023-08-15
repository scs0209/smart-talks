import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Theater } from '../types/theater'

interface ShowtimeState {
  movieId: string
  theaterId: string
  locationId: string
  screenId: string
  selectedTheater: Theater | null
  startTime: string
  endTime: string
}

const initialState: ShowtimeState = {
  movieId: '',
  theaterId: '',
  locationId: '',
  screenId: '',
  selectedTheater: null,
  startTime: '',
  endTime: '',
}

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload
    },
    setTheaterId: (state, action: PayloadAction<string>) => {
      state.theaterId = action.payload
    },
    setLocationId: (state, action: PayloadAction<string>) => {
      state.locationId = action.payload
    },
    setScreenId: (state, action: PayloadAction<string>) => {
      state.screenId = action.payload
    },
    setSelectedTheater: (state, action: PayloadAction<Theater | null>) => {
      state.selectedTheater = action.payload
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const {
  setMovieId,
  setTheaterId,
  setLocationId,
  setScreenId,
  setSelectedTheater,
  setStartTime,
  setEndTime,
} = showtimesSlice.actions

export default showtimesSlice.reducer
