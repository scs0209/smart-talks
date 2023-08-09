import Head from 'next/head'
import { useDispatch } from 'react-redux'

import ReservationForm from '@/components/reservation/ReservationForm'
import { ReservationProvider } from '@/contexts/ReservationContext'
import useFetchData from '@/hooks/useFetchData'
import { AppDispatch } from '@/redux/store'
import { fetchTheaters } from '@/redux/actions/theater'
import { getMovieList } from '@/redux/actions/movie'

const ReservationPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isFetched: isTheatersFetched } = useFetchData({
    dispatch,
    action: fetchTheaters,
  })

  const { isFetched: isMoviesFetched } = useFetchData({
    dispatch,
    action: getMovieList,
  })

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          async
        />
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          async
        />
      </Head>
      <div className="h-screen max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-extrabold dark:text-white m-3">예매</h1>
        <ReservationProvider>
          <ReservationForm />
        </ReservationProvider>
      </div>
    </>
  )
}

export default ReservationPage
