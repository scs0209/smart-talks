import { createSlice } from '@reduxjs/toolkit'
import { saveReservation, getReservationsByUser } from '../actions/reservation'
import { ReservationState } from '../types/reservation'

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
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
  },
})

export default reservationSlice.reducer
