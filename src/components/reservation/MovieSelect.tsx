import { RootState } from '@/redux/store'
import { Label, Select } from 'flowbite-react'
import { Dispatch, SetStateAction, VFC } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  movieId: string
  setMovieId: Dispatch<SetStateAction<string>>
}

const MovieSelect: VFC<Props> = ({ movieId, setMovieId }) => {
  const { data: movies } = useSelector((state: RootState) => state.movies)

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
