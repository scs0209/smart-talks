import { Card, CustomFlowbiteTheme } from 'flowbite-react'
import Link from 'next/link'
import { VFC } from 'react'

import { getImageUrl } from '@/redux/api'
import { Showtime } from '@/redux/types/showtime'

const customTheme: CustomFlowbiteTheme['card'] = {
  img: {
    base: 'max-h-[150px] h-[150px]',
  },
}

interface Props {
  showtime: Showtime
}

const MovieCard: VFC<Props> = ({ showtime }) => {
  const posterUrl = getImageUrl(showtime.movie.poster_path)
  console.log(showtime)

  return (
    <Card
      imgSrc={posterUrl}
      theme={customTheme}
      className="h-[250px] w-[200px] overflow-hidden relative group mr-4"
    >
      <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{showtime.movie.title}</p>
      </h5>
      <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
        <p>평점: {showtime.movie.vote_average}</p>
      </p>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col space-y-4">
          <Link
            href={`/movies/${showtime.movie.id}`}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            상세보기
          </Link>
          <Link
            href={{
              pathname: '/reservation',
              query: { movieId: showtime.movie.id },
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
