import MovieCard from '@/components/Search/MovieCard'
import Select from 'react-select'
import { useDiscoverMoviesQuery, useGetGenreQuery } from '@/redux/api/movieApi'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ExplorePage = () => {
  const router = useRouter()
  const { mediatype } = router.query
  const [pageNum, setPageNum] = useState(1)
  const [genre, setGenre] = useState<any>(null)

  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresError,
  } = useGetGenreQuery(mediatype)

  const { data, isLoading, isError } = useDiscoverMoviesQuery({
    mediaType: mediatype,
    genreId: genre?.id,
    page: pageNum,
  })

  return (
    <div className="max-w-screen-lg min-h-screen px-4 py-16 mx-auto ">
      <h2 className="text-4xl font-semibold">{mediatype}</h2>
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
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default ExplorePage
