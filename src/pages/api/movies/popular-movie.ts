import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3'

interface CrewMember {
  job: string
  name: string
}

interface CastMember {
  name: string
}

export interface Video {
  name: string
  key: string
  site: string
  type: string
}

export interface Movie {
  id: number
  title: string
  director: string
  cast: string[]
  videos: Video[]
}

const getVideos = async (movieId: number): Promise<Video[]> => {
  const response = await axios.get(
    `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  )
  return response.data.results
}

const getDirector = async (movieId: number): Promise<string> => {
  const response = await axios.get(
    `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  )

  const directorInfo = response.data.crew.find(
    (crewMember: CrewMember) => crewMember.job === 'Director',
  )

  return directorInfo ? directorInfo.name : 'Unknown'
}

const getCast = async (movieId: number): Promise<string[]> => {
  const response = await axios.get(
    `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  )

  const castMembers = response.data.cast
    .slice(0, 5)
    .map((castMember: CastMember) => castMember.name)

  return castMembers
}

const getPopularMoviesWithDetails = async (page: number): Promise<Movie[]> => {
  const popularMoviesResponse = await axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`,
  )

  const popularMovies = popularMoviesResponse.data.results

  const startIndex = (page - 1) * 10
  const endIndex = page * 10
  const slicedPopularMovies = popularMovies.slice(startIndex, endIndex)

  const popularMoviesWithDetails: Movie[] = await Promise.all(
    slicedPopularMovies.map(async (movie: Movie) => {
      const director = await getDirector(movie.id)
      const cast = await getCast(movie.id)
      const videos = await getVideos(movie.id) // 비디오 정보 가져오기
      return {
        ...movie,
        director,
        cast,
        videos,
      }
    }),
  )

  return popularMoviesWithDetails
}

// URL에서 쿼리로 페이지 번호를 가져옵니다.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const page = Number(req.query.page) || 1 // 페이지 번호가 쿼리에 없으면 기본값은 1입니다.
      const popularMoviesWithDetails = await getPopularMoviesWithDetails(page)
      res.status(200).json({ results: popularMoviesWithDetails })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching popular movies' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
