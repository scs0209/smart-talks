import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/redux/store'

import MovieCard from './MovieCard'
import { fetchShowtimes } from '@/redux/actions/showtime'
import { Showtime } from '@/redux/types/showtime'

const customTheme: CustomFlowbiteTheme['carousel'] = {
  root: {
    base: 'relative w-full',
  },
  item: {
    wrapper: 'w-1/2',
    base: 'w-1/4',
  },
}

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    data: showtimes,
    loading,
    error,
  } = useSelector((state: RootState) => state.showtimes)

  useEffect(() => {
    dispatch(fetchShowtimes())
  }, [])

  const movieSeen = new Set()
  const uniqueMoviesArray = showtimes.filter((showtime) => {
    const movieId = showtime.movie.id
    if (!movieSeen.has(movieId)) {
      movieSeen.add(movieId)
      return true
    }
    return false
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] overflow-auto">
      <div className="text-2xl font-semibold pt-4 pb-2 dark:text-white">
        영화 목록
      </div>
      <Carousel slide={false} theme={customTheme}>
        {uniqueMoviesArray.map((showtime: Showtime) => (
          <div key={showtime._id} className="w-full">
            <MovieCard showtime={showtime} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieList
