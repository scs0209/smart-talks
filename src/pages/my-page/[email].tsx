import { Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import ChangePasswordModal from '@/components/ChangePasswordModal'
import HeadInfo from '@/components/common/HeadInfo'
import useSWR from 'swr'
import { backUrl } from '@/config'
import fetcher from '@/utils/fetcher'
import { useDispatch } from 'react-redux'
import { deleteReservation } from '@/redux/actions/reservation'
import { AppDispatch } from '@/redux/store'

const MyPage = () => {
  const router = useRouter()
  const { email } = router.query
  const { data: session, status } = useSession()
  const { data: user } = useSWR(`${backUrl}/api/user?email=${email}`, fetcher)
  const { data: reservations } = useSWR(
    user && `${backUrl}/api/reservation?user_id=${user?.user._id}`,
    fetcher,
  )
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      await dispatch(deleteReservation(reservationId))

      // 예약이 취소되었다는 성공 알림을 추가합니다.
      alert('예약이 성공적으로 취소되었습니다.')
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  if (status === 'loading') {
    // 세션 정보 로딩 중인 경우 로딩 상태를 표시할 수 있습니다.
    return <div>Loading...</div>
  }

  if (!session) {
    // 세션이 없는 경우 로그인 페이지로 리다이렉트할 수 있습니다.
    // 예: router.push('/login')
    return <div>Please log in</div>
  }

  return (
    <div className="h-screen">
      <HeadInfo title={`${email}'s Page`} />
      <Typography variant="h2">My Page</Typography>
      <Typography variant="body1">Email: {session.user?.email}</Typography>
      {/* 필요한 사용자 정보를 여기에 추가 */}
      {reservations?.map((reservation: any) => {
        return (
          <div key={reservation._id}>
            {/* 예약 정보를 원하는 형식으로 표시 */}
            <h3>예약 정보</h3>
            <p>{`영화 제목: ${reservation.showtime_id.movie.title}`}</p>
            <p>{`영화 상영 시작 시간: ${reservation.showtime_id.start_time}`}</p>
            <p>{`영화 상영 종료 시간: ${reservation.showtime_id.end_time}`}</p>
            <p>{`극장 ID: ${reservation.showtime_id.theater_id}`}</p>
            <p>{`스크린: ${reservation.showtime_id.screen_name}`}</p>
            <p>{`결제 금액: ${reservation.payment_info.paid_amount} KRW`}</p>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteReservation(reservation._id)}
            >
              Delete Reservation
            </Button>
          </div>
        )
      })}
      <Button variant="contained" onClick={handleOpenModal}>
        Change Password
      </Button>
      <ChangePasswordModal open={open} handleClose={handleCloseModal} />
    </div>
  )
}

export default MyPage
