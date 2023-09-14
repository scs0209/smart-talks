import { useState } from 'react'
import { useGetTrendingMoviesQuery } from '@/redux/api/movieApi'
import dayjs from 'dayjs'
import MovieCard from './MovieCard'
import SwitchTab from './SwitchTab'

const MovieList = () => {
  const [endpoint, setEndpoint] = useState('day')

  // RTK Query 훅 사용
  const { data: trendingMovies, isLoading } =
    useGetTrendingMoviesQuery(endpoint)

  const onTabChange = (tab: string) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week')
  }

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] overflow-auto">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="text-2xl font-semibold dark:text-white">Trending</div>
        <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
      </div>
      {trendingMovies?.results.map((movie: any) => (
        <div key={movie.id} className="max-w-[13rem] gap-4 flex flex-col">
          <MovieCard movie={movie} />
          <span>{movie.title}</span>
          <span> {dayjs(movie.release_date).format('MMM D, YYYY')}</span>
        </div>
      ))}
    </div>
  )
}

export default MovieList
