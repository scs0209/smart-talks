import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'

import { useState } from 'react'
import { useGetTrendingMoviesQuery } from '@/redux/api/movieApi'
import MovieCard from './MovieCard'
import SwitchTab from './SwitchTab'

const customTheme: CustomFlowbiteTheme['carousel'] = {
  root: {
    base: 'relative w-full',
  },
  item: {
    wrapper: 'w-1/2',
    base: 'w-1/4',
  },
}

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
        <div key={movie.id} className="w-full gap-4">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  )
}

export default MovieList
