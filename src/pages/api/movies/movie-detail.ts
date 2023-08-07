import Movie, { IMovie } from '@/models/Movie'
import connectDB from '@/services/dbConnect'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3'

const getDirector = async (movieId: string) => {
  const response = await axios.get(
    `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  )

  const directorInfo = response.data.crew.find(
    (crewMember: { job: string }) => crewMember.job === 'Director',
  )

  return directorInfo ? directorInfo.name : 'Unknown'
}

const getCast = async (movieId: string) => {
  const response = await axios.get(
    `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  )

  const castMembers = response.data.cast
    .slice(0, 5)
    .map((castMember: { name: string }) => castMember.name)

  return castMembers
}

const getMovieData = async (movieId: string) => {
  const response = await axios.get(
    `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`,
  )

  const director = await getDirector(movieId)
  const cast = await getCast(movieId)

  const movieData = {
    id: response.data.id,
    title: response.data.title,
    genres: response.data.genres,
    popularity: response.data.popularity,
    director,
    country: response.data.production_countries[0].iso_3166_1,
    releaseDate: response.data.release_date,
    runtime: response.data.runtime,
    rating: response.data.vote_average.toString(),
    poster: response.data.poster_path,
    synopsis: response.data.overview,
    cast,
    status: response.data.status,
  }

  return movieData
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'GET') {
    const { movieId } = req.query

    try {
      const movieData = await getMovieData(movieId as string)

      res.status(200).json(movieData)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movie data' })
    }
  } else if (req.method === 'POST') {
    const { movieId } = req.query

    try {
      const movieData = await getMovieData(movieId as string)

      const existingMovie = await Movie.findOne({ id: movieData.id })

      if (!existingMovie) {
        const newMovie = new Movie(movieData as IMovie)

        await newMovie.save()

        res.status(201).json({ message: 'Movie saved successfully' })
      } else {
        res.status(409).json({ error: 'Movie already exists in the database' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error saving movie data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
