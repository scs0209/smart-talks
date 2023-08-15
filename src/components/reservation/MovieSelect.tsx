import { Label, Select } from 'flowbite-react'

import { MovieList } from '@/redux/types/movie/movie'
import { useGetMovieListQuery } from '@/redux/api/movieApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setMovieId } from '@/redux/reducers/reservationSlice'

const MovieSelect = () => {
  const { data: movieList, isFetching, isError } = useGetMovieListQuery()
  const { movieId } = useSelector((state: RootState) => state.reservations)
  const dispatch = useDispatch()

  if (isFetching) return <div>Loading...</div>

  if (isError) return <div>{isError}</div>

  return (
    <>
      <Label htmlFor="movie-id" value="영화 선택" />
      <Select
        id="movie-id"
        value={movieId}
        onChange={(e) => dispatch(setMovieId(e.target.value))}
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
