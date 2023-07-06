// 기존 Reservation 인터페이스 업데이트
export interface Reservation {
  _id: string
  theater_id: Object
  user_id?: string
  showtime_id: string
  seat_info?: number[]
  payment_info?: any
}

// 기존 ReservationState 인터페이스 업데이트
export interface ReservationState {
  reservations: Reservation[]
  loading: boolean
  error?: any
}

// 기존 ReservationData 인터페이스 업데이트
export interface ReservationData {
  user_id?: string
  theater_id: Object
  showtime_id: string
  seat_info?: number[]
  payment_info?: any
}
