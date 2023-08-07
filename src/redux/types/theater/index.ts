export interface TheaterLocation {
  id: string
  address: string
}

export interface Theater {
  _id: string
  name: string
  locations: TheaterLocation[]
}

export interface TheaterState {
  theaters: Array<Theater>
  loading: boolean
  error: any
}
