/* eslint-disable */
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
import { Theater } from '@/redux/types/theater'

interface AdminPageContextProps {
  movieId: string
  setMovieId: Dispatch<string>
  theaterId: string
  setTheaterId: Dispatch<string>
  locationId: string
  setLocationId: Dispatch<string>
  screenId: string
  setScreenId: Dispatch<string>
  selectedTheater: Theater | null
  setSelectedTheater: Dispatch<Theater | null>
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
  const [locationId, setLocationId] = useState('')
  const [screenId, setScreenId] = useState('')
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const showtime = {
      movie: movieId,
      theater: locationId,
      screen: screenId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    }

    try {
      await axios.post(`${backUrl}/api/showtime`, showtime)
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
    locationId,
    setLocationId,
    screenId,
    setScreenId,
    selectedTheater,
    setSelectedTheater,
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
