import { Label, Select } from 'flowbite-react'

import { useGetShowtimesQuery } from '@/redux/api/showtimeApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setShowtimeId } from '@/redux/reducers/reservationSlice'
import { Showtime } from '@/redux/types/reservation'

const ShowtimeSelect = () => {
  const { movieId, screenId, locationId, showtimeId } = useSelector(
    (state: RootState) => state.reservations,
  )
  const dispatch = useDispatch()
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
        onChange={(e) => dispatch(setShowtimeId(e.target.value))}
        required
      >
        <option value="">- 시간을 선택하세요. -</option>

        {showtimes?.map((showtime: Showtime) => (
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
