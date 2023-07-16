import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Select, Label } from 'flowbite-react'
import { useReservation } from '@/contexts/ReservationContext'

const TheaterSelect = () => {
  const { theaters } = useSelector((state: RootState) => state.theaters)
  const { theaterId, setTheaterId } = useReservation()
  return (
    <>
      <Label htmlFor="theater-select" value="영화관 선택" />
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
    </>
  )
}

export default TheaterSelect
