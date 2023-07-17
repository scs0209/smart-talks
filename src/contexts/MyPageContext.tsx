import { FC, ReactNode, createContext, useContext, useState } from 'react'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { deleteReservation } from '@/redux/actions/reservation'
import { AppDispatch } from '@/redux/store'
import { backUrl } from '@/config'
import fetcher from '@/utils/fetcher'

interface MyPageContextValue {
  user: any
  reservations: any[]
  handleDeleteReservation: (reservationId: string) => Promise<void>
}

interface Props {
  children: ReactNode
  email: string | string[] | undefined
}

const MyPageContext = createContext<MyPageContextValue>({
  user: null,
  reservations: [],
  handleDeleteReservation: () => Promise.resolve(),
})

export const MyPageProvider: FC<Props> = ({ email, children }) => {
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

  return (
    <MyPageContext.Provider
      value={{ user, reservations, handleDeleteReservation }}
    >
      {children}
    </MyPageContext.Provider>
  )
}

export const useMyPage = () => useContext(MyPageContext)
