import MovieCard from '@/components/Search/MovieCard'
import Select from 'react-select'
import { useDiscoverMoviesQuery, useGetGenreQuery } from '@/redux/api/movieApi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

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
  const router = useRouter()
  const { mediatype } = router.query
  const [dataList, setDataList] = useState<any[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [genre, setGenre] = useState<any>(null)
  const [sort, setSort] = useState<any>(null)

  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresError,
  } = useGetGenreQuery(mediatype)

  const { data, isFetching, isError } = useDiscoverMoviesQuery({
    mediaType: mediatype,
    genreId: genre?.id,
    sort: sort?.value,
    page: pageNum,
  })

  const onChangeGenre = (newGenre: any) => {
    setPageNum(1)
    setDataList([])
    setGenre(newGenre)
  }

  const onChangeSort = (newSort: any) => {
    setPageNum(1)
    setDataList([])
    setSort(newSort)
  }

  const fetchMoreData = () => {
    setPageNum((prevPageNum) => prevPageNum + 1)
  }

  useEffect(() => {
    if (data) {
      if (pageNum === 1) {
        setDataList(data.results)
      } else if (
        pageNum > 1 &&
        JSON.stringify(dataList[dataList.length - 1]) !==
          JSON.stringify(data.results[0])
      ) {
        setDataList((oldData) => [...oldData, ...data.results])
      }
    }
  }, [data, pageNum])

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
          onChange={onChangeGenre}
          isClearable
          placeholder="Select a genre"
        />
        <Select
          name="sort"
          value={sort}
          options={sortOptions}
          onChange={onChangeSort}
          isClearable
          placeholder="Sort by"
        />
      </div>
      {dataList.length > 0 && (
        <InfiniteScroll
          dataLength={dataList.length} // 이 값이 변경될 때마다 새 데이터 로드 함수가 호출됩니다.
          next={fetchMoreData} // 새 데이터 로드 함수입니다.
          hasMore={!isFetching && !isError} // 더 많은 데이터가 있는지 여부입니다.
          loader={<h4>Loading...</h4>} // 로딩 스피너입니다.
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {dataList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ExplorePage
