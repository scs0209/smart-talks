import { Button, CustomFlowbiteTheme, Table } from 'flowbite-react'

import { Reservation, User } from '@/redux/types/reservation'
import {
  useDeleteReservationMutation,
  useGetReservationsByUserQuery,
} from '@/redux/api/reservationApi'
import { VFC } from 'react'

const customTheme: CustomFlowbiteTheme['table'] = {
  root: {
    base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 align-middle',
    shadow:
      'absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10',
    wrapper: 'relative',
  },
}

type UserData = {
  success: boolean
  user: User
}

interface Props {
  user: UserData
}

const ReservationTable: VFC<Props> = ({ user }) => {
  const { data: reservations } = useGetReservationsByUserQuery(user?.user._id)
  const [deleteReservation, { isLoading, isError }] =
    useDeleteReservationMutation()

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      await deleteReservation(reservationId)

      // 예약이 취소되었다는 성공 알림을 추가합니다.
      alert('예약이 성공적으로 취소되었습니다.')
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  console.log(reservations)

  return (
    <Table theme={customTheme}>
      <Table.HeadCell>영화 제목</Table.HeadCell>
      <Table.HeadCell>영화 상영 시작 시간</Table.HeadCell>
      <Table.HeadCell>영화 상영 종료 시간</Table.HeadCell>
      <Table.HeadCell>스크린</Table.HeadCell>
      <Table.HeadCell>결제 금액</Table.HeadCell>
      <Table.HeadCell>
        <span className="sr-only">Delete</span>
      </Table.HeadCell>
      <Table.Body>
        {reservations?.map((reservation: Reservation) => {
          return (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={reservation._id}
            >
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {reservation.showtime.movie.title}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {new Date(reservation.showtime.startTime).toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {new Date(reservation.showtime.endTime).toLocaleTimeString(
                  'ko-KR',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </Table.Cell>
              <Table.Cell className="w-20 font-medium text-gray-900 dark:text-white">
                {reservation.showtime.screen.screenName}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {`${reservation.paymentInfo.paid_amount} KRW`}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Button
                  gradientDuoTone="purpleToPink"
                  outline
                  className="mb-4"
                  size="xs"
                  onClick={() => handleDeleteReservation(reservation._id)}
                >
                  Delete Reservation
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default ReservationTable
