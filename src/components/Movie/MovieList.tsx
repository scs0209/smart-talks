import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'

import { VFC } from 'react'
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

interface Props {
  movieList: any
}

const MovieList: VFC<Props> = ({ movieList }) => {
  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] overflow-auto">
      <div className="pt-4 pb-2 text-2xl font-semibold dark:text-white">
        영화 목록
      </div>
      <Carousel slide={false} theme={customTheme}>
        {movieList?.map((movie: any) => (
          <div key={movie.id} className="w-full">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieList
