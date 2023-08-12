import { Badge } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getImageUrl } from '@/redux/api'
import { useGetMovieDetailsQuery } from '@/redux/api/movieApi'

interface Genre {
  id: number
  name: string
}

const MovieDetail = () => {
  const router = useRouter()
  const movieId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id
  const {
    data: movieDetails,
    isFetching,
    isError,
  } = useGetMovieDetailsQuery(movieId)

  const posterUrl = movieDetails?.poster
    ? getImageUrl(movieDetails.poster)
    : undefined

  console.log(movieDetails)

  const percent = movieDetails?.popularity
    ? Math.floor(movieDetails.popularity / 100)
    : undefined

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !movieDetails) {
    return <div>Error: {isError || 'Movie details not available'}</div>
  }

  return (
    <section className="h-screen">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto mt-2 dark:bg-gray-800">
        <div className="flex flex-col items-start w-full bg-white rounded shadow lg:flex-row lg:items-center">
          <div className="w-full h-64 lg:w-1/3 dark:bg-gray-800">
            <img
              className="object-contain w-full h-full"
              src={posterUrl}
              alt={`${movieDetails.title} poster`}
            />
          </div>
          <div className="w-full h-24 p-4 bg-gray-100 border-t lg:w-2/3 dark:border-gray-700 lg:h-64 lg:border-t-0 lg:border-r lg:border-l lg:rounded-r dark:bg-gray-700">
            <div className="flex items-center">
              <h1 className="mb-2 text-2xl font-bold dark:text-white">
                {movieDetails.title}
              </h1>
              <Badge color="indigo" size="xs" className="ml-3">
                {movieDetails.status}
              </Badge>
            </div>
            <div className="flex items-center mb-2 border-solid border-b-[1px] border-gray-400">
              <span className="mb-3 text-xs text-gray-400">
                {movieDetails.releaseDate}
              </span>
              <Badge color="pink" className="mb-3 ml-3">
                popularity: {percent}%
              </Badge>
            </div>
            <div className="flex flex-col mb-4">
              <span className="font-sans text-sm font-semibold">
                감독: {movieDetails.director}
              </span>
              <span className="font-sans text-sm font-semibold">
                장르:{' '}
                {movieDetails?.genres
                  .map((genre: Genre) => genre.name)
                  .join(', ')}
              </span>
            </div>
            <Link
              href="/movie-reservation"
              className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              <span className="text-[14px] font-sans font-semibold">
                예매하기
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* 영화 줄거리 섹션 */}
      <div className="max-w-screen-xl mx-auto dark:text-white">
        <span className="w-full whitespace-pre-wrap">
          {movieDetails.synopsis}
        </span>
      </div>
    </section>
  )
}

export default MovieDetail
