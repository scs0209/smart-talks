import { Video } from '@/pages/api/movies/popular-movie'

export interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
  videos: Video[]
}
