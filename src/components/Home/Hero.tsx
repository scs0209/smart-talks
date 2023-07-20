import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/redux/store'
import useFetchData from '@/hooks/useFetchData'
import { getPopularMovies } from '@/redux/actions/movie'

const Hero = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies)

  const videoUrl =
    movies &&
    movies.length &&
    movies[0].videos &&
    movies[0].videos.length &&
    movies[0].videos[0] &&
    `https://www.youtube.com/embed/${movies[0].videos[0].key}`

  const { isFetched: isMoviesFetchd } = useFetchData({
    dispatch,
    action: getPopularMovies,
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="bg-black border-solid border-b-[1px] h-[50vh] border-b-gray-500">
      <div className="max-w-screen-xl h-full mx-auto lg:gap-8 xl:gap-0">
        {videoUrl && (
          <iframe
            src={`${videoUrl}?autoplay=1&mute=1`}
            className="w-full h-full shadow-lg border-gray-200/5 shadow-gray-400/50"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Video"
          />
        )}
      </div>
    </section>
  )
}

export default Hero
