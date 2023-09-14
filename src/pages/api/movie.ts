import { NextApiRequest, NextApiResponse } from 'next'

import Movie from '@/models/Movie'
import connectDB from '@/services/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    try {
      const movies = await Movie.find({})
      res.status(200).json(movies)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movies data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
