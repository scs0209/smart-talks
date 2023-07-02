import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api'
import { ReservationData } from '@/redux/types/reservation'

export const saveReservation = createAsyncThunk(
  'reservation/saveReservation',
  async (reservationData: ReservationData) => {
    const response = await api.saveReservationAPI(reservationData)
    return response
  },
)

export const getReservationsByUser = createAsyncThunk(
  'reservation/getReservationsByUser',
  async (userId) => {
    const reservations = await api.getReservationsByUserAPI(userId)
    return reservations
  },
)
