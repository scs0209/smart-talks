import { Card, CustomFlowbiteTheme } from 'flowbite-react'
import Link from 'next/link'
import { VFC } from 'react'

import { getImageUrl } from '@/redux/api/tmdb'

const customTheme: CustomFlowbiteTheme['card'] = {
  img: {
    base: 'max-h-[150px] h-[150px]',
  },
}

interface Props {
  movie: any
}

const MovieCard: VFC<Props> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path)

  return (
    <Card
      imgSrc={posterUrl}
      theme={customTheme}
      className="h-[250px] w-[200px] overflow-hidden relative group mr-4"
    >
      <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{movie.title}</p>
      </h5>
      <div className="text-xs font-normal text-gray-700 dark:text-gray-400">
        <p>평점: {movie.vote_average}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
        <div className="flex flex-col space-y-4">
          <Link
            href={`/movies/${movie.id}`}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            상세보기
          </Link>
          <Link
            href={{
              pathname: '/reservation',
              query: { movieId: movie._id },
            }}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            예매하기
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default MovieCard
