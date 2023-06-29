import { getImageUrl } from '@/redux/api'
import { Movie } from '@/redux/types/movie'
import { Card, CustomFlowbiteTheme } from 'flowbite-react'
import { VFC } from 'react'

const customTheme: CustomFlowbiteTheme['card'] = {
  img: {
    base: 'max-h-[200px] h-[200px]',
  },
}

interface Props {
  movie: Movie
}

const MovieCard: VFC<Props> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path)

  return (
    <Card
      imgSrc={posterUrl}
      theme={customTheme}
      className="h-[300px] overflow-hidden"
    >
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{movie.title}</p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>평점: {movie.vote_average}</p>
      </p>
    </Card>
  )
}

export default MovieCard
