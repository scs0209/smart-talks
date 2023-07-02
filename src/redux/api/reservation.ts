import { backUrl } from '@/config'
import axios from 'axios'
import { ReservationData } from '../types/reservation'

export const saveReservationAPI = async (reservationData: ReservationData) => {
  const { data } = await axios.post(
    `${backUrl}/api/reservation`,
    reservationData,
  )
  return data
}

export const getReservationsByUserAPI = async (userId: any) => {
  const { data } = await axios.get(
    `${backUrl}/api/reservation?user_id=${userId}`,
  )
  return data
}
