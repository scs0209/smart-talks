import { Label, Select } from 'flowbite-react'

import { useReservation } from '@/contexts/ReservationContext'
import { useGetShowtimesQuery } from '@/redux/api/showtimeApi'

const ShowtimeSelect = () => {
  const { movieId, locationId, screenId, showtimeId, setShowtimeId } =
    useReservation()
  const { data: showtimes } = useGetShowtimesQuery(
    { movieId, locationId, screenId },
    {
      skip: !movieId || !locationId || !screenId,
    },
  )

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

        {showtimes?.map((showtime: any) => (
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
