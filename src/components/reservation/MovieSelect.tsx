import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { RootState } from '@/redux/store'
import { Showtime } from '@/redux/types/showtime'

const MovieSelect = () => {
  const { data: showtimes } = useSelector((state: RootState) => state.showtimes)
  const { movieId, setMovieId } = useReservation()

  return (
    <>
      <Label htmlFor="movie-id" value="영화 선택" />
      <Select
        id="movie-id"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        required
      >
        <option value="">- 영화를 선택하세요. -</option>
        {showtimes?.map((movie: Showtime) => (
          <option key={movie._id} value={movie._id}>
            {movie.movie.title} - ({movie.movie.release_date})
          </option>
        ))}
      </Select>
    </>
  )
}

export default MovieSelect
