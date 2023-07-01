export interface Screen {
  id: string
  name: string
}

export interface Theater {
  id: string
  name: string
  address: string
  screens: Array<Screen>
}

export interface TheaterState {
  theaters: Array<Theater>
}
