import { ReservationData } from '../types/reservation'
import { client } from './client'

export const saveReservationAPI = async (reservationData: ReservationData) => {
  const { data } = await client.post('/api/reservation', reservationData)
  return data
}

export const getReservationsByUserAPI = async (userId: any) => {
  const { data } = await client.get(`/api/reservation?user_id=${userId}`)
  return data
}

export const deleteReservationAPI = async (reservationId: string) => {
  const { data } = await client.delete(
    `/api/reservation?reservation_id=${reservationId}`,
  )
  return data
}
