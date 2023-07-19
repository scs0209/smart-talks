import { NextApiRequest, NextApiResponse } from 'next'

import Reservation, { IReservation } from '@/models/Reservation'
import connectDB from '@/services/dbConnect'

const saveReservation = async (reservationData: IReservation) => {
  try {
    const reservation = new Reservation(reservationData)
    await reservation.save()
    return reservation
  } catch (error) {
    console.error('Error saving reservation data:', error)
    return null
  }
}

const getReservationsByUserId = async (user_id: string) => {
  try {
    const reservations = await Reservation.find({ user_id }).populate(
      'showtime_id',
    )
    console.log(reservations)
    return reservations
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return null
  }
}

const deleteReservationById = async (reservation_id: string) => {
  try {
    const result = await Reservation.findByIdAndDelete(reservation_id)
    return result
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'POST') {
    const reservationData = req.body as IReservation

    try {
      const savedReservation = await saveReservation(reservationData)
      if (savedReservation) {
        res.status(200).json(savedReservation)
      } else {
        res.status(500).json({ error: 'Error saving reservation data' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error saving reservation data' })
    }
  } else if (req.method === 'GET') {
    const { user_id } = req.query

    if (typeof user_id === 'string') {
      const reservations = await getReservationsByUserId(user_id)
      if (reservations) {
        res.status(200).json(reservations)
      } else {
        res.status(500).json({ error: 'Error fetching reservations' })
      }
    } else {
      res.status(400).json({ error: 'Invalid user_id' })
    }
  } else if (req.method === 'DELETE') {
    const { reservation_id } = req.query

    if (typeof reservation_id === 'string') {
      const deletedReservation = await deleteReservationById(reservation_id)
      if (deletedReservation) {
        res.status(200).json(deletedReservation)
      } else {
        res.status(500).json({ error: 'Error deleting reservation' })
      }
    } else {
      res.status(400).json({ error: 'Invalid reservation_id' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
