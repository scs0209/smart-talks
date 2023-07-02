import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { fetchTheaters } from '@/redux/actions/theater'
import { getPopularMovies } from '@/redux/actions/movie'

const ReservationPage = () => {
  const [movieId, setMovieId] = useState('')
  const [theaterId, setTheaterId] = useState('')
  const [screenName, setScreenName] = useState('')
  const [showtimeId, setShowtimeId] = useState('')

  const {
    theaters,
    loading: theaterLoading,
    error: theaterError,
  } = useSelector((state: RootState) => state.theaters)

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state: RootState) => state.movies)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTheaters())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPopularMovies(1) as any) // 첫 번째 페이지에서 인기 영화 불러오기
  }, [dispatch])

  const handleSubmit = () => {
    // 예약 데이터를 서버에 전송하는 로직
  }

  if (theaterLoading || movieLoading) {
    return <div>Loading...</div>
  }

  if (theaterError || movieError) {
    return <div>Error: {theaterError || movieError}</div>
  }

  return (
    <div>
      <h1>예약하기</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-id">영화 선택</label>
        <select
          id="movie-id"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        >
          <option value="">- 영화를 선택하세요. -</option>
          {movies?.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title} - ({movie.release_date})
            </option>
          ))}
        </select>
        <label htmlFor="theater-select">영화관 선택</label>
        <select
          id="theater-select"
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
          required
        >
          <option value="">- 영화관을 선택하세요. -</option>
          {theaters.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>
        {/* 상영회 선택 */}
        <label htmlFor="showtime-select">상영회 선택</label>
        <select
          id="showtime-select"
          value={showtimeId}
          onChange={(e) => setShowtimeId(e.target.value)}
          required
        >
          <option value="">- 상영회를 선택하세요. -</option>
          {/* 상영회 정보를 서버에서 가져와서 하위 프로필에 매핑하는 로직이 필요합니다. */}
        </select>
        <button type="submit">예약하기</button>
      </form>
    </div>
  )
}

export default ReservationPage
