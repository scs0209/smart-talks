import { useGetPopularsMoviesQuery } from '@/redux/api/movieApi'
import MovieList from './MovieList'

const Popular = () => {
  return (
    <MovieList
      title="Popular"
      tabs={['Movie', 'TV Show']}
      defaultTab="movie"
      useQuery={useGetPopularsMoviesQuery}
      transformTab={(tab) => (tab === 'Movie' ? 'movie' : 'tv')}
    />
  )
}

export default Popular
