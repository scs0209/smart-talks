import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { RootState } from '@/redux/store'
import { MovieList } from '@/redux/types/movie/movie'

const MovieSelect = () => {
  const { movieList } = useSelector((state: RootState) => state.movies)
  const { movieId, setMovieId } = useReservation()

  console.log(movieId, movieList)

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
        {movieList?.map((movie: MovieList) => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </Select>
    </>
  )
}

export default MovieSelect
