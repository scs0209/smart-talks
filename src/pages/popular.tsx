import MovieCard from '@/components/Search/MovieCard'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import { useGetPopularMoviesQuery } from '@/redux/api/movieApi'
import { setPopularMovies, setPopularPage } from '@/redux/reducers/movieSlice'
import { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PopularMoviePage = () => {
  const dispatch = useDispatch()
  const { popularMovies, popularPage } = useSelector(
    (state: RootState) => state.movies,
  )
  const { data: popularMoviesData, isFetching } =
    useGetPopularMoviesQuery(popularPage)

  useEffect(() => {
    if (popularMoviesData) {
      dispatch(setPopularMovies(popularMoviesData.results))
    }
  }, [popularMoviesData])

  const fetchMoreMovies = () => {
    if (popularMoviesData && popularMoviesData.results.length > 0) {
      dispatch(setPopularPage(popularPage + 1))
    }
  }

  const observerRef = useInfiniteScroll(fetchMoreMovies, {
    threshold: 0.1,
    loading: isFetching,
  })

  return (
    <div className="h-screen max-w-screen-lg mx-auto px-4 py-16 ">
      <h2 className="text-4xl font-semibold">인기 영화 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={observerRef} />
      {isFetching && <div>Loading...</div>}
    </div>
  )
}

export default PopularMoviePage
