import { useRouter } from 'next/router'

import { useGetMovieDetailsQuery } from '@/redux/api/movieApi'
import HeroBanner from '@/components/Details/HeroBanner'
import Cast from '@/components/Details/Cast'
import VideoSection from '@/components/Details/VideoSection'
import Similar from '@/components/Details/Similar'
import Recommendation from '@/components/Details/Recommendation'
import { useSession } from 'next-auth/react'
import Review from '@/components/Details/Review/Review'

const MovieDetail = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const mediaType = Array.isArray(router.query.mediaType)
    ? router.query.mediaType[0]
    : router.query.mediaType

  const movieId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id
  const {
    data: movieDetails,
    isLoading,
    isFetching,
    isError,
  } = useGetMovieDetailsQuery({ mediaType, id: movieId })

  const cast = movieDetails?.cast
  const videos = movieDetails?.videos
  const similar = movieDetails?.similar
  const recommendations = movieDetails?.recommendations

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !movieDetails) {
    return <div>Error: {isError || 'Movie details not available'}</div>
  }

  return (
    <section className="detail">
      <HeroBanner
        movieDetails={movieDetails}
        mediaType={mediaType}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <Cast cast={cast} />
      <VideoSection videos={videos} />
      <Similar
        similar={similar}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <Recommendation
        recommendations={recommendations}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <Review movieId={movieId} session={session} />
    </section>
  )
}

export default MovieDetail
