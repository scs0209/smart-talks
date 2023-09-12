/* eslint-disable */
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
    <ul id="movie-id">
      {movieList?.map((movie: MovieList) => (
        <li
          key={movie._id}
          onClick={() => dispatch(setMovieId(movie._id))}
          className={`cursor-pointer ${
            movie._id === movieId ? 'font-bold' : ''
          }`}
        >
          {movie.title}
        </li>
      ))}
    </ul>
  )
}

export default MovieSelect
