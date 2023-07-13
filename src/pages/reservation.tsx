import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { fetchTheaters } from '@/redux/actions/theater'
import { getPopularMovies } from '@/redux/actions/movie'
import { fetchShowtimes } from '@/redux/actions/showtime'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { backUrl } from '@/config'
import fetcher from '@/utils/fetcher'
import Head from 'next/head'
import useFetchData from '@/hooks/useFetchData'
import ReservationInput from '@/components/reservation/ReservationInput'

const ReservationPage = () => {
  const { data: session } = useSession()
  const { data: user } = useSWR(
    `${backUrl}/api/user?email=${session?.user?.email}`,
    fetcher,
  )

  const dispatch = useDispatch<AppDispatch>()

  const { isFetched: isTheatersFetched } = useFetchData({
    dispatch,
    action: fetchTheaters,
  })

  const { isFetched: isMoviesFetched } = useFetchData({
    dispatch,
    action: () => getPopularMovies(1) as any,
  })

  const { isFetched: isShowtimesFetched } = useFetchData({
    dispatch,
    action: fetchShowtimes,
  })

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
      <div className="h-screen max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-extrabold dark:text-white m-3">예매</h1>
        <ReservationInput user={user} dispatch={dispatch} />
      </div>
    </>
  )
}

export default ReservationPage
