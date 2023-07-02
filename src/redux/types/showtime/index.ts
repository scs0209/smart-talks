export interface Showtime {
  _id: string
  movie_id: any
  theater_id: any
  screen_name: string
  start_time: Date
  end_time: Date
}

export interface ShowtimesState {
  data: Showtime[]
  loading: boolean
  error?: string
}
