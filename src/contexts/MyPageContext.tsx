/* eslint-disable */
import { createContext, FC, ReactNode, useContext } from 'react'

import {
  useDeleteReservationMutation,
  useGetReservationsByUserQuery,
} from '@/redux/api/reservationApi'
import { Reservation } from '@/redux/types/reservation'
import { useGetUserByEmailQuery } from '@/redux/api/userApi'

interface MyPageContextValue {
  user: any
  reservations: Reservation[]
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
  const { data: user } = useGetUserByEmailQuery(email)
  const { data: reservations } = useGetReservationsByUserQuery(user?.user._id)
  const [deleteReservation, { isLoading, isError }] =
    useDeleteReservationMutation()

  console.log(reservations)
  const handleDeleteReservation = async (reservationId: string) => {
    try {
      await deleteReservation(reservationId)

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
