import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieCard from '@/components/Search/MovieCard'
import { searchMovies } from '@/redux/actions/movie'
import { AppDispatch, RootState } from '@/redux/store'

const SearchResults = () => {
  const { data: searchedMovies, loading } = useSelector(
    (state: RootState) => state.movies,
  )
  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (query?.query) {
      // Ensure query.query is a string by using type assertion
      const queryStr = Array.isArray(query.query) ? query.query[0] : query.query
      dispatch(searchMovies(queryStr))
    }
  }, [query, dispatch])

  return (
    <div className="container max-w-screen-lg mx-auto px-4 py-16">
      <h2 className="text-4xl font-semibold">검색 결과</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchedMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
