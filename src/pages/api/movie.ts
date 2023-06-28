import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import Movie, { IMovie } from '../../models/Movie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    const movies = await Movie.find({})
    res.status(200).json({ movies })
  } else if (req.method === 'POST') {
    try {
      const newMovie: IMovie = new Movie({
        title: 'Dummy Movie',
        director: 'Dummy Director',
        releaseDate: new Date(),
        // 필요한 나머지 필드를 추가하세요.
      })
      await newMovie.save()
      res.status(200).json({
        success: true,
        movie: newMovie,
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
