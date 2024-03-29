import React, { VFC } from 'react'
import dayjs from 'dayjs'
import Carousel from '../Home/Carousel'
import MovieCard from '../Movie/MovieCard'

interface Props {
  similar: any
  isLoading: boolean
  isFetching: boolean
}

const Similar: VFC<Props> = ({ similar, isFetching, isLoading }) => {
  return (
    <>
      {similar.length > 0 && (
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="text-2xl font-semibold dark:text-white">Similar</div>
          <Carousel>
            {similar &&
              similar.map((movie: any) => (
                <div key={movie.id} className="min-w-[13rem] gap-2">
                  <MovieCard
                    movie={movie}
                    isFetching={isFetching}
                    isLoading={isLoading}
                  />
                  <div className="flex flex-col mt-6">
                    <span className="overflow-hidden font-sans text-xl font-bold overflow-ellipsis whitespace-nowrap dark:text-white">
                      {movie.title || movie.name}
                    </span>
                    <span className="font-sans text-sm font-extrabold text-gray-500">
                      {dayjs(movie.release_date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      )}
    </>
  )
}

export default Similar
