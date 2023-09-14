import { IMG_URL } from '@/utils/tmdbApiConfig'
import { client } from './client'

export const getMovieList = async () => {
  const { data } = await client.get('/api/movie-list')

  return data
}

export const getPopularMoviesAPI = async (page: number) => {
  const { data } = await client.get(`/api/movies/popular-movie?page=${page}`)
  return data.results
}

export const getMovieDetailsAPI = async (id: string) => {
  const { data } = await client.get(`/api/movies/movie-detail?movieId=${id}`)
  return data
}

export const searchMoviesAPI = async (
  query: string | undefined,
  page: number,
) => {
  const { data } = await client.get(
    `/api/movies/movie-search?query=${query}&page=${page}`,
  )
  return data.results
}

export const getImageUrl = (path: string) => `${IMG_URL}${path}`
