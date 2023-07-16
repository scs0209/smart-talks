import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Select, Label } from 'flowbite-react'
import { useReservation } from '@/contexts/ReservationContext'

const ShowtimeSelect = () => {
  const { data: showtimes } = useSelector((state: RootState) => state.showtimes)
  const { movieId, theaterId, showtimeId, setShowtimeId } = useReservation()
  return (
    <>
      <Label htmlFor="showtime-id" value="상영회 선택" />
      <Select
        id="showtime-select"
        value={showtimeId}
        onChange={(e) => setShowtimeId(e.target.value)}
        required
      >
        <option value="">- 상영 회를 선택하세요. -</option>

        {showtimes
          .filter(
            (showtime) =>
              showtime.movie.id.toString() === movieId &&
              showtime.theater_id._id === theaterId,
          )
          .map((showtime, index) => (
            <option key={showtime._id} value={showtime._id}>
              {showtime.start_time.split('T')[1].substring(0, 5)}
              {showtime.screen_name}
            </option>
          ))}
      </Select>
    </>
  )
}

export default ShowtimeSelect
