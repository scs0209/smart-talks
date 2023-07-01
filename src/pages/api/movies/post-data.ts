import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import Movie, { IMovie } from '@/models/Movie'

const saveMovieData = async (movieData: IMovie) => {
  try {
    const movie = new Movie(movieData)
    await movie.save()
    return movie
  } catch (error) {
    console.error('Error saving movie data:', error)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'POST') {
    const movieData = req.body as IMovie

    try {
      const savedMovie = await saveMovieData(movieData)
      if (savedMovie) {
        res.status(200).json(savedMovie)
      } else {
        res.status(500).json({ error: 'Error saving movie data' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error saving movie data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
