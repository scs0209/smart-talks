import { useGetTopRatedMoviesQuery } from '@/redux/api/movieApi'
import MovieList from './MovieList'

const TopRated = () => {
  return (
    <MovieList
      title="Top Rated"
      tabs={['Movie', 'TV Show']}
      defaultTab="movie"
      useQuery={useGetTopRatedMoviesQuery}
      transformTab={(tab) => (tab === 'Movie' ? 'movie' : 'tv')}
    />
  )
}

export default TopRated
