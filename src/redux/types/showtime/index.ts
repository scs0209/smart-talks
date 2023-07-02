export interface Showtime {
  _id: string
  movie: any
  theater_id: any
  screen_name: string
  start_time: string
  end_time: string
}

export interface ShowtimesState {
  data: Showtime[]
  loading: boolean
  error?: string
}
