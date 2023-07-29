import { client } from './client'

const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const getPopularMoviesAPI = async (page: number) => {
  const { data } = await client.get(`/api/movies/popular-movie?page=${page}`)
  return data.results
}

export const getMovieDetailsAPI = async (id: string) => {
  const { data } = await client.get(`/api/movies/movie-detail?movieId=${id}`)
  return data
}

export const searchMoviesAPI = async (query: string) => {
  const { data } = await client.get(`/api/movies/movie-search?query=${query}`)
  return data.results
}

export const getImageUrl = (path: string) => `${IMG_URL}${path}`
