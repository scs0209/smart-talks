/* eslint-disable */
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

  return (
    <ul id="showtime-id">
      {showtimes?.map((showtime: Showtime) => (
        <li
          key={showtime._id}
          onClick={() => dispatch(setShowtimeId(showtime._id))}
          className={`cursor-pointer ${
            showtime._id === showtimeId ? 'font-bold' : ''
          }`}
        >
          {`${new Date(showtime.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })} - ${new Date(showtime.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        </li>
      ))}
    </ul>
  )
}

export default ShowtimeSelect
