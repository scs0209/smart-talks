import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Theater } from '../types/theater'

interface ReservationState {
  movieId: string
  theaterId: string
  showtimeId: string
  screenId: string
  locationId: string
  selectedSeats: number[]
  selectedTheater: Theater | null
}

const initialState: ReservationState = {
  movieId: '',
  theaterId: '',
  showtimeId: '',
  screenId: '',
  locationId: '',
  selectedSeats: [],
  selectedTheater: null,
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload
    },
    setTheaterId: (state, action: PayloadAction<string>) => {
      state.theaterId = action.payload
    },
    setShowtimeId: (state, action: PayloadAction<string>) => {
      state.showtimeId = action.payload
    },
    setScreenId: (state, action: PayloadAction<string>) => {
      state.screenId = action.payload
    },
    setLocationId: (state, action: PayloadAction<string>) => {
      state.locationId = action.payload
    },
    setSelectedSeats: (state, action: PayloadAction<number[]>) => {
      state.selectedSeats = action.payload
    },
    toggleSeat: (state, action: PayloadAction<number>) => {
      const seatId = action.payload

      if (state.selectedSeats.includes(seatId)) {
        state.selectedSeats = state.selectedSeats.filter(
          (seat) => seat !== seatId,
        )
      } else {
        state.selectedSeats.push(seatId)
      }
    },
    setSelectedTheater: (state, action: PayloadAction<Theater | null>) => {
      state.selectedTheater = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const {
  setMovieId,
  setTheaterId,
  setShowtimeId,
  setScreenId,
  setLocationId,
  setSelectedSeats,
  setSelectedTheater,
  toggleSeat,
} = reservationSlice.actions

export default reservationSlice.reducer
