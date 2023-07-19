import axios from 'axios'
import {
  createContext,
  Dispatch,
  FormEvent,
  ReactNode,
  useContext,
  useState,
} from 'react'

import { backUrl } from '@/config'

interface AdminPageContextProps {
  movieId: string
  setMovieId: Dispatch<string>
  theaterId: string
  setTheaterId: Dispatch<string>
  screenName: string
  setScreenName: Dispatch<string>
  branchAddress: string
  setBranchAddress: Dispatch<string>
  startTime: string
  setStartTime: Dispatch<string>
  endTime: string
  setEndTime: Dispatch<string>
  handleSubmit: (e: FormEvent) => void
}

const AdminPageContext = createContext<AdminPageContextProps | null>(null)

export const useAdminPage = () => {
  const context = useContext(AdminPageContext)

  if (!context) {
    throw new Error('useAdminPage must be used within a AdminPageProvider')
  }

  return context
}

interface Props {
  children: ReactNode
}

export const AdminPageProvider = ({ children }: Props) => {
  const [movieId, setMovieId] = useState('')
  const [theaterId, setTheaterId] = useState('')
  const [screenName, setScreenName] = useState('')
  const [branchAddress, setBranchAddress] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const showtime = {
      theater: theaterId,
      branch_address: branchAddress,
      screen_name: screenName,
      start_time: new Date(startTime),
      end_time: new Date(endTime),
    }

    const showtimeData = {
      movie: movieId,
      showtimes: [showtime],
    }

    try {
      await axios.post(`${backUrl}/api/showtime`, showtimeData)
      alert('상영시간 생성 완성!')
    } catch (error) {
      console.error('생성 중 에러가 발생했습니다.', error)
      alert('상영시간 생성에 실패했습니다!')
    }
  }

  const value: AdminPageContextProps = {
    movieId,
    setMovieId,
    theaterId,
    setTheaterId,
    screenName,
    setScreenName,
    branchAddress,
    setBranchAddress,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleSubmit,
  }

  return (
    <AdminPageContext.Provider value={value}>
      {children}
    </AdminPageContext.Provider>
  )
}

export default AdminPageContext
