import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/redux/store'

import { getMovieList } from '@/redux/actions/movie'
import MovieCard from './MovieCard'

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
  const { movieList, loading, error } = useSelector(
    (state: RootState) => state.movies,
  )

  useEffect(() => {
    dispatch(getMovieList())
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] overflow-auto">
      <div className="text-2xl font-semibold pt-4 pb-2 dark:text-white">
        영화 목록
      </div>
      <Carousel slide={false} theme={customTheme}>
        {movieList?.map((movie) => (
          <div key={movie.id} className="w-full">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieList
