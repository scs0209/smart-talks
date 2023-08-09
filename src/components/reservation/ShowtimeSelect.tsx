import { Label, Select } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fetchShowtimes } from '@/redux/actions/showtime'

const ShowtimeSelect = () => {
  const { data: showtimes } = useSelector((state: RootState) => state.showtimes)
  const { movieId, locationId, screenId, showtimeId, setShowtimeId } =
    useReservation()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchShowtimes({ movieId, locationId, screenId }))
  }, [movieId, locationId, screenId])

  console.log(showtimes, showtimeId)

  return (
    <>
      <Label htmlFor="showtime-id" value="시간 선택" />
      <Select
        id="showtime-select"
        value={showtimeId}
        onChange={(e) => setShowtimeId(e.target.value)}
        required
      >
        <option value="">- 시간을 선택하세요. -</option>

        {showtimes?.map((showtime) => (
          <option key={showtime._id} value={showtime._id}>
            {new Date(showtime.startTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(showtime.endTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </option>
        ))}
      </Select>
    </>
  )
}

export default ShowtimeSelect
