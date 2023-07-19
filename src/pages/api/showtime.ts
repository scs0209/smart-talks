import { NextApiRequest, NextApiResponse } from 'next'

import Showtime, { IShowtime } from '@/models/Showtime'
import connectDB from '@/services/dbConnect'

const getAllShowtimes = async () => {
  try {
    const showtimes = await Showtime.find().populate('movie').populate({
      path: 'showtimes.theater',
      select: 'name',
    })
    return showtimes
  } catch (error) {
    console.error('Error fetching showtimes:', error)
    return null
  }
}

const addShowtime = async (data: IShowtime) => {
  try {
    const movieData = data.movie
    const existingShowtime = await Showtime.findOne({
      movie: movieData,
    })

    if (existingShowtime) {
      existingShowtime.showtimes.push(data.showtimes[0])
      await existingShowtime.save()
    } else {
      const showtime = new Showtime(data)
      await showtime.save()
    }

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
