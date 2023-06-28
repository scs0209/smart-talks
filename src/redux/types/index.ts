import { Movie } from './movie'

export interface MovieDetails {
  adult: boolean
  backdrop_path: string | null
  genres: Array<{ id: number; name: string }>
  id: number
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  release_date: string
  runtime: number | null
  status: string
  title: string
  vote_average: number
  vote_count: number
}

export interface Movies {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
