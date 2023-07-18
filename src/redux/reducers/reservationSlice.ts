import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  deleteReservation,
  getReservationsByUser,
  saveReservation,
} from '../actions/reservation'
import { ReservationState } from '../types/reservation'

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
  selectedReservation: {
    movieId: '',
    theaterId: '',
    showtimeId: '',
    selectedSeats: [],
  },
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string>) => {
      state.selectedReservation.movieId = action.payload
    },
    setTheaterId: (state, action: PayloadAction<string>) => {
      state.selectedReservation.theaterId = action.payload
    },
    setShowtimeId: (state, action: PayloadAction<string>) => {
      state.selectedReservation.showtimeId = action.payload
    },
    setSelectedSeats: (state, action: PayloadAction<any[]>) => {
      state.selectedReservation.selectedSeats = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveReservation.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(saveReservation.fulfilled, (state, action) => {
      state.loading = false
      state.reservations = [...state.reservations, action.payload]
    })

    builder.addCase(saveReservation.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })

    builder.addCase(getReservationsByUser.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(getReservationsByUser.fulfilled, (state, action) => {
      state.loading = false
      state.reservations = action.payload
    })

    builder.addCase(getReservationsByUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })

    builder.addCase(deleteReservation.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.loading = false
      state.reservations = state.reservations.filter(
        (reservation) => reservation._id !== action.payload._id,
      )
    })

    builder.addCase(deleteReservation.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export const { setMovieId, setTheaterId, setShowtimeId, setSelectedSeats } =
  reservationSlice.actions

export default reservationSlice.reducer
