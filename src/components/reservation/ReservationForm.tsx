import { useReservation } from '@/contexts/ReservationContext'
import { Button } from 'flowbite-react'
import MovieSelect from './MovieSelect'
import ShowtimeSelect from './ShowtimeSelect'
import TheaterSelect from './TheaterSelect'
import SeatTable from './SeatTable'

const ReservationForm = () => {
  const { handleSubmit } = useReservation()

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MovieSelect />
        <TheaterSelect />
        <ShowtimeSelect />
        <Button type="submit" color="purple" className="mt-3">
          예약하기
        </Button>
      </form>
      <SeatTable />
    </>
  )
}

export default ReservationForm
