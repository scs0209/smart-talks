import { useRouter } from 'next/router'

import { useGetMovieDetailsQuery } from '@/redux/api/movieApi'
import HeroBanner from '@/components/Details/HeroBanner'
import Cast from '@/components/Details/Cast'
import VideoSection from '@/components/Details/VideoSection'
import Similar from '@/components/Details/Similar'

interface Genre {
  id: number
  name: string
}

const MovieDetail = () => {
  const router = useRouter()
  const mediaType = Array.isArray(router.query.mediaType)
    ? router.query.mediaType[0]
    : router.query.mediaType

  const movieId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id
  const {
    data: movieDetails,
    isFetching,
    isError,
  } = useGetMovieDetailsQuery({ mediaType, id: movieId })

  const cast = movieDetails?.cast
  const videos = movieDetails?.videos
  const similar = movieDetails?.similar

  console.log(movieDetails)

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !movieDetails) {
    return <div>Error: {isError || 'Movie details not available'}</div>
  }

  return (
    <section className="detail">
      <HeroBanner movieDetails={movieDetails} />
      <Cast cast={cast} />
      <VideoSection videos={videos} />
      <Similar similar={similar} />
    </section>
  )
}

export default MovieDetail
