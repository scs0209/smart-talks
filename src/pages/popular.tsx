import MovieCard from '@/components/Search/MovieCard'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import Select from 'react-select'

import {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
} from '@/redux/api/movieApi'
import { setPopularMovies, setPopularPage } from '@/redux/reducers/movieSlice'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PopularMoviePage = () => {
  const dispatch = useDispatch()
  const [genre, setGenre] = useState(null)
  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresError,
  } = useGetGenresQuery()
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
    <div className="max-w-screen-lg min-h-screen px-4 py-16 mx-auto ">
      <h2 className="text-4xl font-semibold">인기 영화 목록</h2>
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <Select
          name="genres"
          value={genre}
          options={genresData?.results}
          getOptionLabel={(option: any) => option?.name}
          getOptionValue={(option) => option?.id}
          onChange={setGenre}
          placeholder="Select a genre"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
