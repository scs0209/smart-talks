import MovieCard from '@/components/Movie/MovieCard'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const SearchResults = () => {
  const { data: searchedMovies, loading: searchLoading } = useSelector(
    (state: RootState) => state.movies,
  )

  return (
    <div className="container mx-auto px-4 py-16">
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
