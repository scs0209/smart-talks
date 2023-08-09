export interface Showtime {
  _id: string
  movie: string
  theater: string
  screen: string
  startTime: Date
  endTime: string
}

export interface ShowtimesState {
  data: Showtime[]
  loading: boolean
  error?: string | null
}
