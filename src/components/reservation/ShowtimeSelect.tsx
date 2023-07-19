import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { RootState } from '@/redux/store'

const ShowtimeSelect = () => {
  const { data: showtimes } = useSelector((state: RootState) => state.showtimes)
  const { movieId, theaterId, showtimeId, setShowtimeId } = useReservation()

  const showtimesData = showtimes
    .find((showtime) => showtime._id === movieId)
    ?.showtimes.filter((s) => s.theater._id === theaterId)

  console.log(showtimesData, theaterId)

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

        {showtimesData?.map((showtime, index) => (
          <option key={showtime._id} value={showtime._id}>
            {new Date(showtime.start_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(showtime.end_time).toLocaleTimeString([], {
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
