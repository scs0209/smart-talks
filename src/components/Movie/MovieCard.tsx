import Link from 'next/link'
import { VFC } from 'react'

import { getImageUrl } from '@/redux/api/tmdb'
import Image from 'next/image'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface Props {
  movie: any
}

const MovieCard: VFC<Props> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path)

  const determineColor = (rating: number) => {
    if (rating < 5) return 'red'
    if (rating < 7) return 'orange'
    return 'green'
  }

  const rating = movie.vote_average.toFixed(1)

  return (
    <div className="relative grid h-[15rem] w-full max-w-[13rem] flex-col items-end justify-center rounded-xl bg-white bg-clip-border text-center text-gray-700">
      <Image
        src={posterUrl}
        alt="movie-image"
        width={300}
        height={230}
        className="absolute inset-0 m-0 z-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
      />
      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-black/20" />
      <div className="relative inline-block bg-transparent rounded-full p-4 -bottom-9 w-20">
        <CircularProgressbar
          value={rating}
          maxValue={10}
          background
          text={rating}
          styles={buildStyles({
            pathColor: determineColor(rating),
            backgroundColor: 'white',
            trailColor: 'transparent',
            textSize: '30px',
            textColor: determineColor(rating),
          })}
        />
      </div>
    </div>
  )
}

export default MovieCard
