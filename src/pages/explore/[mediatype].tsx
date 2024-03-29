import MovieCard from '@/components/Search/MovieCard'
import Select from 'react-select'
import { useDiscoverMoviesQuery, useGetGenreQuery } from '@/redux/api/movieApi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setAllResults, setPage } from '@/redux/reducers/movieSlice'
import { Spinner } from 'flowbite-react'
import Head from 'next/head'

const sortOptions = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending',
  },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'original_title.asc', label: 'Title (A-Z)' },
]

const ExplorePage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { mediatype } = router.query
  const { allResults, page } = useSelector((state: RootState) => state.movies)
  const [genre, setGenre] = useState<any>(null)
  const [sort, setSort] = useState<any>(null)

  const { data: genresData, isError: genresError } = useGetGenreQuery(mediatype)

  const {
    data,
    isFetching,
    isLoading,
    isError,
    isLoading: isMediaTypeLoading,
  } = useDiscoverMoviesQuery({
    mediaType: mediatype,
    genreId: genre?.id,
    sort: sort?.value,
    page,
  })

  const onChange = (selectedItems: any, action: any) => {
    if (action.name === 'sort') {
      setSort(selectedItems)
      if (action.action !== 'clear') {
        dispatch(setPage(1))
        dispatch(setAllResults([]))
      }
    }

    if (action.name === 'genres') {
      setGenre(selectedItems)
      if (action.action !== 'clear') {
        dispatch(setPage(1))
        dispatch(setAllResults([]))
      }
    }
  }

  const fetchMoreData = () => {
    if (allResults && allResults.length > 0) {
      dispatch(setPage(page + 1))
    }
  }

  // 초기 상태로 설정
  useEffect(() => {
    dispatch(setPage(1))
    dispatch(setAllResults([]))
    setSort(null)
    setGenre(null)
  }, [mediatype])

  useEffect(() => {
    if (data) {
      const sortedResults = [...data.results]
      if (sort) {
        const sortKey = sort.value.split('.')[0] // 정렬 기준 항목 (popularity, vote_average 등)
        const sortOrder = sort.value.split('.')[1] // 정렬 방식 (asc, desc)
        sortedResults.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortKey] - b[sortKey]
          }
          return b[sortKey] - a[sortKey]
        })
      }
      dispatch(setAllResults(sortedResults))
    }
  }, [data, sort])

  return (
    <>
      <Head>
        <title>{mediatype}</title>
      </Head>
      <div className="max-w-screen-lg min-h-screen px-4 py-16 mx-auto ">
        <h2 className="text-4xl font-semibold dark:text-white">{mediatype}</h2>
        <div className="flex flex-col space-y-2 mb-4 md:flex-row md:space-y-0 md:space-x-4">
          <Select
            name="genres"
            value={genre}
            options={genresData?.results}
            getOptionLabel={(option: any) => option?.name}
            getOptionValue={(option) => option?.id}
            onChange={onChange}
            isClearable
            placeholder="Select a genre"
          />
          <Select
            name="sort"
            value={sort}
            options={sortOptions}
            onChange={onChange}
            isClearable
            placeholder="Sort by"
          />
        </div>
        {allResults.length > 0 && (
          <InfiniteScroll
            dataLength={allResults.length} // 이 값이 변경될 때마다 새 데이터 로드 함수가 호출됩니다.
            next={fetchMoreData} // 새 데이터 로드 함수입니다.
            hasMore={!isFetching && !isError} // 더 많은 데이터가 있는지 여부입니다.
            loader={
              <div className="flex items-center justify-center">
                <Spinner
                  className="w-12 h-12"
                  color="success"
                  aria-label="Success spinner example"
                  size="xl"
                />
                <span className="text-4xl font-bold dark:text-white">
                  Loading...
                </span>
              </div>
            } // 로딩 스피너입니다.
            scrollThreshold={1}
            style={{ overflowY: 'hidden' }}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {allResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFetching={isFetching}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  )
}

export default ExplorePage
