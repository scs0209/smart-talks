import { useGetPopularsMoviesQuery } from '@/redux/api/movieApi'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import SwitchTab from './SwitchTab'
import Carousel from '../Home/Carousel'
import MovieCard from './MovieCard'

const Popular = () => {
  const [mediaType, setMediaType] = useState('movie')

  const { data: popularMovies } = useGetPopularsMoviesQuery(mediaType)

  const onTabChange = (tab: string) => {
    setMediaType(tab === 'Movie' ? 'movie' : 'tv')
  }

  console.log(popularMovies)

  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] p-4">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="text-2xl font-semibold dark:text-white">Popular</div>
        <SwitchTab data={['Movie', 'TV Show']} onTabChange={onTabChange} />
      </div>
      <Carousel>
        {popularMovies?.results.map((movie: any) => (
          <div key={movie.id} className="min-w-[13rem] gap-2">
            <MovieCard movie={movie} />
            <div className="mt-6 flex flex-col">
              <span>{movie.title || movie.name}</span>
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

export default Popular
