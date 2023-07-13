import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Select, Label } from 'flowbite-react'
import { Dispatch, SetStateAction, VFC } from 'react'

interface Props {
  movieId: string
  theaterId: string
  showtimeId: string
  setShowtimeId: Dispatch<SetStateAction<string>>
}

const ShowtimeSelect: VFC<Props> = ({
  movieId,
  theaterId,
  showtimeId,
  setShowtimeId,
}) => {
  const { data: showtimes } = useSelector((state: RootState) => state.showtimes)

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
              {showtime.start_time.split('T')[1].substring(0, 5)} {''}
              {showtime.screen_name}
            </option>
          ))}
      </Select>
    </>
  )
}

export default ShowtimeSelect
