import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieCard from '@/components/Search/MovieCard'
import { searchMovies } from '@/redux/actions/movie'
import { AppDispatch, RootState } from '@/redux/store'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const SearchResults = () => {
  const { searchResult, loading } = useSelector(
    (state: RootState) => state.movies,
  )
  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (query?.query) {
      const queryStr = Array.isArray(query.query) ? query.query[0] : query.query
      setPage(1)
      dispatch(searchMovies({ query: queryStr, page: 1 }))
    }
  }, [query, dispatch])

  const fetchMoreMovies = () => {
    setPage((prevPage) => prevPage + 1)
    const queryStr = Array.isArray(query.query) ? query.query[0] : query.query
    dispatch(searchMovies({ query: queryStr, page: page + 1 }))
  }

  const observerRef = useInfiniteScroll(fetchMoreMovies, {
    threshold: 0.5,
    loading,
  })

  return (
    <div className="container max-w-screen-lg mx-auto px-4 py-16">
      <h2 className="text-4xl font-semibold">검색 결과</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchResult?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={observerRef} />
    </div>
  )
}

export default SearchResults
