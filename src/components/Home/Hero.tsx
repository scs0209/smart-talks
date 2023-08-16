import { VFC } from 'react'

interface Props {
  movies: any
}

const Hero: VFC<Props> = ({ movies }) => {
  const videoUrl = `https://www.youtube.com/embed/${movies?.results[0].video.key}`

  return (
    <section className="bg-black border-solid border-b-[1px] h-[50vh] border-b-gray-500">
      <div className="h-full max-w-screen-xl mx-auto lg:gap-8 xl:gap-0">
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
