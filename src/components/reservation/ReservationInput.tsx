import { useState, FormEvent, VFC } from 'react'
import { AppDispatch } from '@/redux/store'
import { saveReservation } from '@/redux/actions/reservation'
import { Button } from 'flowbite-react'
import MovieSelect from './MovieSelect'
import TheaterSelect from './TheaterSelect'
import ShowtimeSelect from './ShowtimeSelect'
import { processPayment } from '@/utils/payment'
import SeatTable from './SeatTable'

interface Props {
  user: any
  dispatch: AppDispatch
}

const ReservationInput: VFC<Props> = ({ user, dispatch }) => {
  const [theaterId, setTheaterId] = useState('')
  const [showtimeId, setShowtimeId] = useState('')
  const [movieId, setMovieId] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])

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
        movie_id: movieId,
        theater_id: theaterId,
        showtime_id: showtimeId,
        user_id: user.user._id,
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MovieSelect movieId={movieId} setMovieId={setMovieId} />
        <TheaterSelect theaterId={theaterId} setTheaterId={setTheaterId} />
        <ShowtimeSelect
          movieId={movieId}
          theaterId={theaterId}
          showtimeId={showtimeId}
          setShowtimeId={setShowtimeId}
        />
        <Button type="submit" color="purple" className="mt-3">
          예약하기
        </Button>
      </form>
      <SeatTable
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
    </>
  )
}

export default ReservationInput
