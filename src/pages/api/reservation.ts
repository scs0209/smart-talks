import Reservation, { IReservation } from '@/models/Reservation'
import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    const reservations = await Reservation.find({})
    res.status(200).json({ reservations })
  } else if (req.method === 'POST') {
    try {
      const newReservation: IReservation = new Reservation({
        // 필요한 필드를 모두 추가하세요.
      })
      await newReservation.save()
      res.status(200).json({
        success: true,
        reservation: newReservation,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}
