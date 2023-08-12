import { useRouter } from 'next/router'
import { useEffect } from 'react'

import MovieCard from '@/components/Search/MovieCard'
import { useSearchMoviesQuery } from '@/redux/api/movieApi'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setAllResults, setPage } from '@/redux/reducers/movieSlice'

const SearchResults = () => {
  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch()
  const { allResults, page } = useSelector((state: RootState) => state.movies)

  const searchQuery = Array.isArray(query.query) ? query.query[0] : query.query

  const {
    data: searchResult,
    isLoading,
    isFetching,
  } = useSearchMoviesQuery(
    {
      query: searchQuery,
      page,
    },
    {
      skip: !searchQuery,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    },
  )

  useEffect(() => {
    if (searchResult) {
      dispatch(setAllResults(searchResult?.results))
    }
  }, [searchResult, dispatch])

  const fetchMoreMovies = () => {
    if (searchResult && searchResult.results.length > 0) {
      dispatch(setPage(page + 1))
    }
  }

  const observerRef = useInfiniteScroll(fetchMoreMovies, {
    threshold: 0.5,
    loading: isLoading || isFetching,
  })

  useEffect(() => {
    if (searchQuery) {
      dispatch(setPage(1))
    }
  }, [searchQuery, dispatch])

  return (
    <div className="container max-w-screen-lg px-4 py-16 mx-auto">
      <h2 className="text-4xl font-semibold">검색 결과</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={observerRef} />
    </div>
  )
}

export default SearchResults
