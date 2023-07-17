import { useMyPage } from '@/contexts/MyPageContext'
import { Button, CustomFlowbiteTheme, Table } from 'flowbite-react'

const customTheme: CustomFlowbiteTheme['table'] = {
  root: {
    base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 align-middle',
    shadow:
      'absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10',
    wrapper: 'relative',
  },
}

const ReservationTable = () => {
  const { reservations, handleDeleteReservation } = useMyPage()

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
        {reservations?.map((reservation: any) => {
          return (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={reservation._id}
            >
              {/* 예약 정보를 원하는 형식으로 표시 */}
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {reservation.showtime_id.movie.title}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(reservation.showtime_id.start_time).toLocaleString(
                  'ko-KR',
                  {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  },
                )}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(reservation.showtime_id.end_time).toLocaleString(
                  'ko-KR',
                  {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  },
                )}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900 dark:text-white w-20">
                {reservation.showtime_id.screen_name}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {`${reservation.payment_info.paid_amount} KRW`}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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