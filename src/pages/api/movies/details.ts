import connectDB from '@/services/dbConnect'
import { API_KEY, API_URL } from '@/utils/tmdbApiConfig'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const getDirector = async (mediaType: string, id: string) => {
  const response = await axios.get(
    `${API_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`,
  )

  const directorInfo = response.data.crew.find(
    (crewMember: { job: string }) => crewMember.job === 'Director',
  )

  return directorInfo ? directorInfo.name : 'Unknown'
}

const getCast = async (mediaType: string, id: string) => {
  const response = await axios.get(
    `${API_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`,
  )

  const castMembers = response.data.cast
    .slice(0, 5)
    .map((castMember: { name: string }) => castMember.name)

  return castMembers
}

const getVideo = async (mediaType: string, id: string) => {
  const response = await axios.get(
    `${API_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`,
  )

  // Assuming the first video is the one you want
  return response.data.results[0]?.key || 'No video available'
}

const getMovieData = async (mediaType: string, id: string) => {
  const response = await axios.get(
    `${API_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=ko`,
  )

  const director =
    mediaType === 'movie' ? await getDirector(mediaType, id) : null

  const cast = await getCast(mediaType, id)
  const videoKey = await getVideo(mediaType, id)

  const movieData = {
    id: response.data.id,
    title: response.data.title,
    genres: response.data.genres,
    popularity: response.data.popularity,
    backdrop: response.data.backdrop_path,
    tagline: response.data.tagline,
    videoKey,
    director,
    country: response.data.production_countries[0].iso_3166_1,
    releaseDate: response.data.release_date,
    runtime: response.data.runtime,
    rating: response.data.vote_average,
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
    const { mediaType, id } = req.query

    try {
      const movieData = await getMovieData(mediaType as string, id as string)

      res.status(200).json(movieData)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movie data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
