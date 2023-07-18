import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { RootState } from '@/redux/store'

const MovieSelect = () => {
  const { data: movies } = useSelector((state: RootState) => state.movies)
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
        {movies?.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title} - ({movie.release_date})
          </option>
        ))}
      </Select>
    </>
  )
}

export default MovieSelect
