import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const Hero = () => {
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

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="bg-white border-solid border-b-[1px] h-[50vh] border-b-gray-500 dark:bg-gray-900">
      <div className="max-w-screen-xl h-full mx-auto lg:gap-8 xl:gap-0">
        {videoUrl && (
          <iframe
            src={`${videoUrl}?autoplay=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Video"
          ></iframe>
        )}
      </div>
    </section>
  )
}

export default Hero
