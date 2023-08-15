import Head from 'next/head'

import ReservationForm from '@/components/reservation/ReservationForm'

const ReservationPage = () => {
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
        <h1 className="m-3 text-5xl font-extrabold dark:text-white">예매</h1>
        <ReservationForm />
      </div>
    </>
  )
}

export default ReservationPage
