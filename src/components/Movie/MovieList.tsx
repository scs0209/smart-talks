import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'

import { useGetMovieListQuery } from '@/redux/api/movieApi'
import MovieCard from './MovieCard'

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
  const { data: movieList, isLoading, isError } = useGetMovieListQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {isError}</div>

  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] overflow-auto">
      <div className="pt-4 pb-2 text-2xl font-semibold dark:text-white">
        영화 목록
      </div>
      <Carousel slide={false} theme={customTheme}>
        {movieList?.map((movie) => (
          <div key={movie.id} className="w-full">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieList
