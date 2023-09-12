import { Button, Table } from 'flowbite-react'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { FormEvent } from 'react'
import { getFormattedDate } from '@/utils/formDate'
import { processPayment } from '@/utils/payment'
import { useSaveReservationMutation } from '@/redux/api/reservationApi'
import { useGetUserByEmailQuery } from '@/redux/api/userApi'
import ScreenSelect from './ScreenSelect'
import TheaterSelect from './TheaterSelect'
import ShowtimeSelect from './ShowtimeSelect'
import SeatTable from './SeatTable'
import MovieSelect from './MovieSelect'

const ReservationForm = () => {
  const { data: session } = useSession()
  const { data: user } = useGetUserByEmailQuery(session?.user?.email)
  const { showtimeId, selectedSeats, movieId, theaterId } = useSelector(
    (state: RootState) => state.reservations,
  )
  const [saveReservation, { isLoading, isError }] = useSaveReservationMutation()

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Table className="p-2">
          <thead>
            <tr>
              <th>영화</th>
              <th>극장</th>
              <th>스크린</th>
              <th>시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <MovieSelect />
              </td>
              {/* TheaterSelect */}
              <td>
                <TheaterSelect />
              </td>
              <td>
                <ScreenSelect />
              </td>
              {/* Showtime Select */}
              <td>
                <ShowtimeSelect />
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </Table>
        <Button type="submit" color="purple" className="mt-3">
          예약하기
        </Button>
      </form>
      <SeatTable />
    </>
  )
}

export default ReservationForm
