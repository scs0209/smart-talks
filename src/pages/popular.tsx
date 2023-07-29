import MovieCard from '@/components/Search/MovieCard'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import { getPopularMovies } from '@/redux/actions/movie'
import { AppDispatch, RootState } from '@/redux/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PopularMoviePage = () => {
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies)
  const dispatch = useDispatch<AppDispatch>()

  const [currentPage, setCurrentPage] = useState(0)

  const fetchMoreMovies = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1
      dispatch(getPopularMovies(nextPage))
      return nextPage
    })
  }

  const observerRef = useInfiniteScroll(fetchMoreMovies, {
    threshold: 0.1,
    loading,
  })

  console.log(movies)

  return (
    <div className="h-screen max-w-screen-lg mx-auto px-4 py-16 ">
      <h2 className="text-4xl font-semibold">인기 영화 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={observerRef}></div>
      {loading && <div>Loading...</div>}
    </div>
  )
}

export default PopularMoviePage
