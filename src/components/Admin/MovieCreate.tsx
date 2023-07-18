import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useAdminPage } from '@/contexts/AdminContext'
import { RootState } from '@/redux/store'

const MovieCreate = () => {
  const { movieId, setMovieId } = useAdminPage()
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state: RootState) => state.movies)

  if (movieLoading) {
    return <div>Loading...</div>
  }

  if (movieError) {
    return <div>Error: {movieError}</div>
  }

  return (
    <>
      <Label htmlFor="movie-id" value="Movie ID" />
      <Select
        id="movie-id"
        value={JSON.stringify(movieId)}
        onChange={(e) => setMovieId(JSON.parse(e.target.value))}
        required
      >
        <option value="">- Select a movie -</option>
        {movies?.map((movie) => (
          <option key={movie.id} value={JSON.stringify(movie)}>
            {movie.title} - ({movie.release_date})
          </option>
        ))}
      </Select>
    </>
  )
}

export default MovieCreate
