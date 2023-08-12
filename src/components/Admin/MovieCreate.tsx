import { Label, Select } from 'flowbite-react'

import { useAdminPage } from '@/contexts/AdminContext'
import { useGetMovieListQuery } from '@/redux/api/movieApi'

const MovieCreate = () => {
  const { movieId, setMovieId } = useAdminPage()
  const { data: movieList, isLoading, isError } = useGetMovieListQuery()

  console.log(movieList, movieId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {isError}</div>
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
