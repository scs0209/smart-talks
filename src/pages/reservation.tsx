import { useState, useEffect, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { fetchTheaters } from '@/redux/actions/theater'
import { getPopularMovies } from '@/redux/actions/movie'
import { fetchShowtimes } from '@/redux/actions/showtime'
import { useSession } from 'next-auth/react'
import { saveReservation } from '@/redux/actions/reservation'
import useSWR from 'swr'
import { backUrl } from '@/config'
import fetcher from '@/utils/fetcher'
import SeatTable from '@/components/reservation/SeatTable'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { processPayment } from '@/utils/payment'
import { Button, Label, Select } from 'flowbite-react'

const ReservationPage = () => {
  const { data: session } = useSession()
  const { data: user } = useSWR(
    `${backUrl}/api/user?email=${session?.user?.email}`,
    fetcher,
  )
  const [theaterId, setTheaterId] = useState('')
  const [showtimeId, setShowtimeId] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])
  const router = useRouter()
  const [movieId, setMovieId] = useState(router.query.movieId?.toString() || '')

  const {
    theaters,
    loading: theaterLoading,
    error: theaterError,
  } = useSelector((state: RootState) => state.theaters)

  const {
    data: showtimes,
    loading: showtimesLoading,
    error: showtimesError,
  } = useSelector((state: RootState) => {
    return state.showtimes
  })

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useSelector((state: RootState) => state.movies)

  const {
    reservations,
    loading: reservationsLoading,
    error: reservationsError,
  } = useSelector((state: RootState) => state.reservations)

  console.log(session?.user, user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTheaters())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPopularMovies(1) as any) // 첫 번째 페이지에서 인기 영화 불러오기
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchShowtimes())
  }, [dispatch])
  console.log(movieId, theaterId, showtimes)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // 결제 시 사용할 데이터
    const paymentData = {
      movieName: '영화 이름', // 선택한 영화의 이름으로 변경해주세요.
      userEmail: user.user.email,
      userName: user.user.name,
    }

    const paymentResponse = await processPayment(paymentData) // execute payment
    console.log(paymentResponse)

    // 예약 데이터를 서버에 전송하는 로직
    if (movieId && theaterId && showtimeId && user.user._id) {
      const reservationData = {
        movie_id: movieId,
        theater_id: theaterId,
        showtime_id: showtimeId,
        user_id: user.user._id,
        seat_info: selectedSeats,
        payment_info: paymentResponse, // add payment_info field
      }

      const actionResult = await dispatch(saveReservation(reservationData)) // 예약 데이터 저장하기
      if (saveReservation.fulfilled.match(actionResult)) {
        alert('예약이 성공적으로 생성되었습니다.')
        setSelectedSeats([])
      } else if (saveReservation.rejected.match(actionResult)) {
        alert('예약 생성에 실패했습니다.') // 실패 시 에러 메시지 설정
      }
    }
  }

  if (theaterLoading || movieLoading || reservationsLoading) {
    return <div>Loading...</div>
  }

  if (theaterError || movieError || reservationsError) {
    return <div>Error: {theaterError || movieError}</div>
  }

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <div className="h-screen">
        <h1 className="text-5xl font-extrabold dark:text-white m-3">예매</h1>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="movie-id" value="영화 선택"></Label>
          <Select
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
          </Select>
          <Label htmlFor="theater-select" value="영화관 선택"></Label>
          <Select
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
          </Select>
          {/* 상영회 선택 */}
          <Label htmlFor="showtime-id" value="상영회 선택"></Label>
          <Select
            id="showtime-select"
            value={showtimeId}
            onChange={(e) => setShowtimeId(e.target.value)}
            required
          >
            <option value="">- 상영 회를 선택하세요. -</option>

            {showtimes
              .filter(
                (showtime) =>
                  showtime.movie.id.toString() === movieId &&
                  showtime.theater_id._id === theaterId,
              )
              .map((showtime, index) => (
                <option key={showtime._id} value={showtime._id}>
                  {showtime.start_time.split('T')[1].substring(0, 5)} {''}
                  {showtime.screen_name}
                </option>
              ))}
          </Select>
          <Button type="submit" color="purple" className="mt-3">
            예약하기
          </Button>
        </form>
        <SeatTable
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
      </div>
    </>
  )
}

export default ReservationPage
