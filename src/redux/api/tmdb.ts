import axios from 'axios'

const API_KEY = 'cdfa5acb07c29f633e3999afff1890ea' // 사용자의 TMDB API 키

const API_URL = 'https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const getPopularMoviesAPI = async (page: number) => {
  const { data } = await axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  )
  console.log(data) // Movies 인터페이스와 똑같은 형태
  return data.results
}

export const getMovieDetailsAPI = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
  return data
}

export const searchMoviesAPI = async (query: string) => {
  const { data } = await axios.get(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  )
  return data.results
}

export const getImageUrl = (path: string) => `${IMG_URL}${path}`
