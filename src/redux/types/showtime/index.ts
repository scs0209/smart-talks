import { Movie } from '../movie/movie'

interface IShowtime {
  _id: string
  theater: {
    _id: string
    name: string
  }
  address: string
  screen_name: string
  start_time: string
  end_time: string
}

export interface Showtime {
  _id: string
  movie: Movie
  showtimes: IShowtime[]
}

export interface ShowtimesState {
  data: Showtime[]
  loading: boolean
  error?: string
}
