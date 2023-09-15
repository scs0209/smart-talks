import { VFC, useState } from 'react'
import dayjs from 'dayjs'
import MovieCard from './MovieCard'
import SwitchTab from './SwitchTab'
import Carousel from '../Home/Carousel'

interface Props {
  title: string
  tabs: string[]
  defaultTab: string
  useQuery: (tab: string) => any
  transformTab?: (tab: string) => string
}

const MovieList: VFC<Props> = ({
  title,
  tabs,
  defaultTab,
  useQuery,
  transformTab,
}) => {
  const [tab, setTab] = useState(defaultTab)

  // RTK Query 훅 사용
  const { data: movies } = useQuery(transformTab ? transformTab(tab) : tab)

  const onTabChange = (newTab: string) => {
    setTab(newTab)
  }

  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] p-4">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="text-2xl font-semibold dark:text-white">{title}</div>
        <SwitchTab data={tabs} onTabChange={onTabChange} />
      </div>
      <Carousel>
        {movies?.results.map((movie: any) => (
          <div key={movie.id} className="min-w-[13rem] gap-2">
            <MovieCard movie={movie} />
            <div className="mt-6 flex flex-col">
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {movie.title || movie.name}
              </span>
              <span className="text-gray-500 font-sans font-extrabold text-sm">
                {' '}
                {dayjs(movie.release_date).format('MMM D, YYYY')}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieList
