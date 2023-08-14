/* eslint-disable */

export interface User {
  _id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface Movie {
  _id: string
  title: string
}

export interface Theater {
  _id: string
  name: string
  address: string
}

export interface Screen {
  _id: string
  screenName: string
  theater: string
  address: string
}

export interface Showtime {
  _id: string
  movie: Movie
  theater: Theater
  screen: Screen
  startTime: string
  endTime: string
  __v: number
}

export interface Reservation {
  _id: string
  user: User
  showtime: Showtime
  seatInfo: number[]
  paymentInfo: any
}

interface SelectedReservation {
  movieId: string
  theaterId: string
  showtimeId: string
  selectedSeats: any[]
}

// 기존 ReservationState 인터페이스 업데이트
export interface ReservationState {
  reservations: Reservation[]
  loading: boolean
  error?: any
  selectedReservation: SelectedReservation
}

// 기존 ReservationData 인터페이스 업데이트
export interface ReservationData {
  user: string
  showtime: string
  seatInfo: number[]
  paymentInfo: any
}
