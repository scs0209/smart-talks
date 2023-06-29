import axios from 'axios'

const API_KEY = 'cdfa5acb07c29f633e3999afff1890ea' // 사용자의 TMDB API 키

const API_URL = 'https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const getPopularMoviesAPI = async (page: number) => {
  const totalPages = 2 // 페이지 수를 2로 설정하여 총 20개의 영화를 10개씩 가져옵니다.
  const moviesPerPage = 10 // 페이지당 영화 수를 10개로 설정합니다.

  const startIndex = (page - 1) * moviesPerPage
  const endIndex = page * moviesPerPage

  const { data } = await axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
  )

  const slicedResults = data.results.slice(startIndex, endIndex) // 결과 배열을 10개씩 자릅니다.

  return slicedResults
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
