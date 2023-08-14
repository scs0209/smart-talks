import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  reducers: {},
  extraReducers: (builder) => {},
})

export default reservationSlice.reducer
