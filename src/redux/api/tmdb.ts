import axios from 'axios'

const API_KEY = 'cdfa5acb07c29f633e3999afff1890ea' // 사용자의 TMDB API 키

const API_URL = 'http://localhost:3000/'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const getPopularMoviesAPI = async (page: number) => {
  const { data } = await axios.get(
    `${API_URL}/api/movies/popular-movie?page=${page}`,
  )
  return data.results
}

export const getMovieDetailsAPI = async (id: string) => {
  // 수정된 부분
  const { data } = await axios.get(
    `${API_URL}/api/movies/movie-detail?movieId=${id}`,
  )
  return data
}

export const searchMoviesAPI = async (query: string) => {
  const { data } = await axios.get(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  )
  return data.results
}

export const getImageUrl = (path: string) => `${IMG_URL}${path}`