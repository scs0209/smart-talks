import { Label, Select } from 'flowbite-react'

import { useReservation } from '@/contexts/ReservationContext'
import { MovieList } from '@/redux/types/movie/movie'
import { useGetMovieListQuery } from '@/redux/api/movieApi'

const MovieSelect = () => {
  const { data: movieList, isFetching, isError } = useGetMovieListQuery()
  const { movieId, setMovieId } = useReservation()

  console.log(movieId, movieList)

  if (isFetching) return <div>Loading...</div>

  if (isError) return <div>{isError}</div>

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
