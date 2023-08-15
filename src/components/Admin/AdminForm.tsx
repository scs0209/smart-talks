import { Button } from 'flowbite-react'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { FormEvent } from 'react'
import { useCreateShowtimeMutation } from '@/redux/api/showtimeApi'
import TheaterNScreenCreate from './TheaterNScreenCreate'
import StartEndCreate from './StartEndCreate'
import MovieCreate from './MovieCreate'

const AdminForm = () => {
  const { movieId, locationId, screenId, startTime, endTime } = useSelector(
    (state: RootState) => state.showtimes,
  )
  const [createShowtimeMutation] = useCreateShowtimeMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const showtime = {
      movieId,
      locationId,
      screenId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    }

    try {
      await createShowtimeMutation(showtime).unwrap()
      alert('상영시간 생성 완성!')
    } catch (error) {
      console.error('생성 중 에러가 발생했습니다.', error)
      alert('상영시간 생성에 실패했습니다!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <MovieCreate />
      <TheaterNScreenCreate />
      <StartEndCreate />
      <Button color="gray" type="submit">
        Create Showtime
      </Button>
    </form>
  )
}

export default AdminForm
