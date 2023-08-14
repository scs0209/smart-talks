/* eslint-disable */
import { useSession } from 'next-auth/react'
import {
  createContext,
  Dispatch,
  FC,
  FormEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { processPayment } from '@/utils/payment'
import { getFormattedDate } from '@/utils/formDate'
import { useSaveReservationMutation } from '@/redux/api/reservationApi'
import { useGetUserByEmailQuery } from '@/redux/api/userApi'

interface ReservationContextProps {
  movieId: string
  setMovieId: (id: string) => void
  theaterId: string
  setTheaterId: (id: string) => void
  showtimeId: string
  setShowtimeId: (id: string) => void
  screenId: string
  setScreenId: Dispatch<SetStateAction<string>>
  locationId: string
  setLocationId: Dispatch<SetStateAction<string>>
  selectedSeats: number[]
  setSelectedSeats: (selectedSeats: any) => void
  user: any
  handleSubmit: (e: FormEvent) => void
}

interface Props {
  children: ReactNode
}

const ReservationContext = createContext<ReservationContextProps | null>(null)

export const useReservation = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }

  return context
}

export const ReservationProvider: FC<Props> = ({ children }) => {
  const [movieId, setMovieId] = useState('')
  const [theaterId, setTheaterId] = useState('')
  const [showtimeId, setShowtimeId] = useState('')
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [screenId, setScreenId] = useState('')
  const [locationId, setLocationId] = useState('')
  const [saveReservation, { isLoading, isError }] = useSaveReservationMutation()
  const { data: session } = useSession()
  const { data: user } = useGetUserByEmailQuery(session?.user?.email)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const paymentDate = getFormattedDate(new Date())

      const paymentData = {
        movieName: '영화 이름',
        userEmail: user.user.email,
        userName: user.user.username,
        paymentDate,
      }

      const paymentResponse = await processPayment(paymentData)

      if (movieId && theaterId && showtimeId && user.user._id) {
        const reservationData = {
          user: user.user._id,
          showtime: showtimeId,
          seatInfo: selectedSeats,
          paymentInfo: paymentResponse,
        }

        await saveReservation(reservationData)
      }
    } catch (error) {
      console.error('예약 생성 중 오류 발생: ', error)
      alert('예약 생성 중 오류가 발생했습니다.')
    }
  }

  const value: ReservationContextProps = {
    movieId,
    setMovieId,
    theaterId,
    setTheaterId,
    showtimeId,
    setShowtimeId,
    screenId,
    setScreenId,
    locationId,
    setLocationId,
    selectedSeats,
    setSelectedSeats,
    user,
    handleSubmit,
  }

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export default ReservationContext
