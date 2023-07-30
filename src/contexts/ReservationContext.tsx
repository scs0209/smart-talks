/* eslint-disable */
import { useSession } from 'next-auth/react'
import {
  createContext,
  FC,
  FormEvent,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'

import { backUrl } from '@/config'
import { saveReservation } from '@/redux/actions/reservation'
import { AppDispatch } from '@/redux/store'
import fetcher from '@/utils/fetcher'
import { processPayment } from '@/utils/payment'

interface ReservationContextProps {
  movieId: string
  setMovieId: (id: string) => void
  theaterId: string
  setTheaterId: (id: string) => void
  showtimeId: string
  setShowtimeId: (id: string) => void
  branchAddress: string
  setBranchAddress: React.Dispatch<React.SetStateAction<string>>
  selectedSeats: number[]
  setSelectedSeats: (selectedSeats: any) => void
  user: any
  dispatch: AppDispatch
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
  const [selectedSeats, setSelectedSeats] = useState<any[]>([])
  const [branchAddress, setBranchAddress] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()
  const { data: user } = useSWR(
    `${backUrl}/api/user?email=${session?.user?.email}`,
    fetcher,
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const paymentData = {
      movieName: '영화 이름',
      userEmail: user.user.email,
      userName: user.user.name,
    }

    const paymentResponse = await processPayment(paymentData)

    if (movieId && theaterId && showtimeId && user.user._id) {
      const reservationData = {
        theater_id: theaterId,
        showtimes_id: movieId,
        showtime_id: showtimeId,
        user_id: user.user._id,
        seat_info: selectedSeats,
        payment_info: paymentResponse,
      }

      const actionResult = await dispatch(saveReservation(reservationData))
      if (saveReservation.fulfilled.match(actionResult)) {
        alert('예약이 성공적으로 생성되었습니다.')
      } else if (saveReservation.rejected.match(actionResult)) {
        alert('예약 생성에 실패했습니다.')
      }
    }
  }

  const value: ReservationContextProps = {
    movieId,
    setMovieId,
    theaterId,
    setTheaterId,
    showtimeId,
    setShowtimeId,
    branchAddress,
    setBranchAddress,
    selectedSeats,
    setSelectedSeats,
    user,
    dispatch,
    handleSubmit,
  }

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

export default ReservationContext
