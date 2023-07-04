import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getPopularMovies } from '@/redux/actions/movie'
import MovieCard from './MovieCard'
import Footer from '../Footer'
import { RootState } from '@/redux/store'
import { Movie } from '@/redux/types/movie/movie'
import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'

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
  const dispatch = useDispatch()
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies)

  useEffect(() => {
    dispatch(getPopularMovies(1) as any) // 첫 번째 페이지에서 인기 영화 불러오기
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <div className="max-w-screen-xl mx-auto dark:bg-gray-900 h-[50vh] overflow-auto">
        <div className="text-2xl font-semibold pt-4 pb-2">영화 목록</div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
        <Carousel slide={false} theme={customTheme}>
          {movies?.map((movie: Movie) => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Carousel>
        {/* </div> */}
      </div>
      <Footer />
    </>
  )
}

export default MovieList
