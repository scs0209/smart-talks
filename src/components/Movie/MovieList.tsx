import { useState } from 'react'
import { useGetTrendingMoviesQuery } from '@/redux/api/movieApi'
import dayjs from 'dayjs'
import MovieCard from './MovieCard'
import SwitchTab from './SwitchTab'
import Carousel from '../Home/Carousel'

const MovieList = () => {
  const [endpoint, setEndpoint] = useState('day')

  // RTK Query 훅 사용
  const { data: trendingMovies, isLoading } =
    useGetTrendingMoviesQuery(endpoint)

  const onTabChange = (tab: string) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week')
  }

  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] p-4">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="text-2xl font-semibold dark:text-white">Trending</div>
        <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
      </div>
      <Carousel>
        {trendingMovies?.results.map((movie: any) => (
          <div key={movie.id} className="min-w-[13rem] gap-2 flex flex-col">
            <MovieCard movie={movie} />
            <span>{movie.title}</span>
            <span className="text-gray-500 font-sans font-extrabold text-sm">
              {' '}
              {dayjs(movie.release_date).format('MMM D, YYYY')}
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieList
