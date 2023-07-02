import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import Showtime, { IShowtime } from '@/models/Showtime'

const getAllShowtimes = async () => {
  try {
    const showtimes = await Showtime.find()
      .populate('movie')
      .populate('theater_id')
    return showtimes
  } catch (error) {
    console.error('Error fetching showtimes:', error)
    return null
  }
}

const addShowtime = async (data: IShowtime) => {
  try {
    const showtime = new Showtime(data)
    await showtime.save()
    return true
  } catch (error) {
    console.error('Error adding showtime:', error)
    return false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    const showtimes = await getAllShowtimes()
    if (showtimes) {
      res.status(200).json(showtimes)
    } else {
      res.status(500).json({ error: 'Error fetching showtimes' })
    }
  } else if (req.method === 'POST') {
    const success = await addShowtime(req.body)
    if (success) {
      res.status(201).json({ message: 'Showtime created successfully' })
    } else {
      res.status(500).json({ error: 'Error creating showtime' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
