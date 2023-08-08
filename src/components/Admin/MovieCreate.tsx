import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useAdminPage } from '@/contexts/AdminContext'
import { RootState } from '@/redux/store'

const MovieCreate = () => {
  const { movieId, setMovieId } = useAdminPage()
  const {
    movieList,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state: RootState) => state.movies)

  console.log(movieList, movieId)

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
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        required
      >
        <option value="">- Select a movie -</option>
        {movieList?.map((movie) => (
          <option key={movie.id} value={movie._id}>
            {movie.title} - ({movie.releaseDate})
          </option>
        ))}
      </Select>
    </>
  )
}

export default MovieCreate
