import { Movie } from './movie'

export interface MovieDetails {
  id: number
  title: string
  genres: Array<{ id: number; name: string }>
  popularity: number
  director: string
  country: string
  releaseDate: string
  runtime: number
  rating: string
  poster: string
  synopsis: string
  cast: string[]
  status: string
}

export interface Movies {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
