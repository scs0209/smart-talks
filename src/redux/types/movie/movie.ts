import { Video } from '@/pages/api/movies/popular'

export interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
  video: Video
}

export interface MovieList {
  _id: string
  id: number
  title: string
  poster: string
  releaseDate: string
  rating: string
  synopsis: string
}
