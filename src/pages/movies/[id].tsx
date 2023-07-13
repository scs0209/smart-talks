import { getMovieDetails } from '@/redux/actions/movie'
import { getImageUrl } from '@/redux/api'
import { RootState } from '@/redux/store'
import { Badge } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Genre {
  id: number
  name: string
}

const MovieDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const { movieDetails, loading, error } = useSelector((state: RootState) => {
    return state.movies
  })
  const posterUrl = movieDetails?.poster
    ? getImageUrl(movieDetails.poster)
    : undefined

  console.log(movieDetails)

  const percent = movieDetails?.popularity
    ? Math.floor(movieDetails.popularity / 100)
    : undefined
  useEffect(() => {
    if (id) {
      const movieId = Array.isArray(id) ? id[0] : id
      dispatch(getMovieDetails(movieId) as any)
    }
  }, [id, dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !movieDetails) {
    return <div>Error: {error || 'Movie details not available'}</div>
  }

  return (
    <section className="h-screen">
      <div className="flex items-center justify-between mt-2 mx-auto max-w-screen-xl dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded bg-white shadow">
          <div className="w-full lg:w-1/3 h-64 dark:bg-gray-800">
            <img
              className="object-contain h-full w-full"
              src={posterUrl}
              alt={`${movieDetails.title} poster`}
            />
          </div>
          <div className="p-4 w-full lg:w-2/3 h-24 dark:border-gray-700 lg:h-64 border-t lg:border-t-0 lg:border-r lg:border-l lg:rounded-r dark:bg-gray-700 bg-gray-100">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold dark:text-white mb-2">
                {movieDetails.title}
              </h1>
              <Badge color="indigo" size="xs" className="ml-3">
                {movieDetails.status}
              </Badge>
            </div>
            <div className="flex items-center mb-2 border-solid border-b-[1px] border-gray-400">
              <span className="text-xs text-gray-400 mb-3">
                {movieDetails.releaseDate}
              </span>
              <Badge color="pink" className="ml-3 mb-3">
                popularity: {percent}%
              </Badge>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-sm font-semibold font-sans">
                감독: {movieDetails.director}
              </span>
              <span className="text-sm font-semibold font-sans">
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
