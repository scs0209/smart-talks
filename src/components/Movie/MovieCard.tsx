import Link from 'next/link'
import { VFC } from 'react'

import { getImageUrl } from '@/redux/api/tmdb'
import Image from 'next/image'

interface Props {
  movie: any
}

const MovieCard: VFC<Props> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path)

  return (
    <>
      <div className="relative grid h-[15rem] w-full max-w-[13rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
        <Image
          src={posterUrl}
          alt="movie-image"
          width={300}
          height={230}
          className="absolute inset-0 m-0 z-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
      </div>
      {/* <Card
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
      </Card> */}
    </>
  )
}

export default MovieCard
