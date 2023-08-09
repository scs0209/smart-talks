import { NextApiRequest, NextApiResponse } from 'next'

import Reservation, { IReservation } from '@/models/Reservation'
import connectDB from '@/services/dbConnect'

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

  if (req.method === 'GET') {
    const { user_id } = req.query

    try {
      const query = user_id ? { user: user_id } : {}
      const reservations = await Reservation.find(query)
        .populate('user')
        .populate({
          path: 'showtime',
          populate: [
            { path: 'movie', select: 'title' },
            { path: 'theater', select: '-__v' },
            { path: 'screen', select: '-__v' },
          ],
        })

      res.status(200).json(reservations)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching reservations data' })
    }
  } else if (req.method === 'POST') {
    try {
      const newReservation: IReservation = new Reservation(req.body)
      await newReservation.save()

      res.status(201).json(newReservation)
    } catch (error) {
      res.status(500).json({ error: 'Error creating new reservation' })
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
