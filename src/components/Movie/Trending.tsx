import { useGetTrendingMoviesQuery } from '@/redux/api/movieApi'
import MovieList from './MovieList'

const Trending = () => {
  return (
    <MovieList
      title="Trending"
      tabs={['Day', 'Week']}
      defaultTab="day"
      useQuery={useGetTrendingMoviesQuery}
      transformTab={(tab) => (tab === 'Day' ? 'day' : 'week')}
    />
  )
}

export default Trending
