import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { RootState } from '@/redux/store'

const TheaterSelect = () => {
  const { data: showtimes } = useSelector((state: RootState) => state.showtimes)
  const { movieId, theaterId, setTheaterId, branchAddress, setBranchAddress } =
    useReservation()

  const selectedTheater = showtimes.find((theater) => theater._id === movieId)

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
        {selectedTheater?.showtimes.map((showtime) => (
          <option key={showtime.theater._id} value={showtime.theater._id}>
            {showtime.theater.name}
          </option>
        ))}
      </Select>
      <Label htmlFor="address-select" value="지점 선택" />
      <Select
        id="address-select"
        value={branchAddress}
        onChange={(e) => setBranchAddress(e.target.value)}
        required
      >
        <option value="">- 지점을 선택하세요. -</option>
        {selectedTheater?.showtimes.map((showtime) => (
          <option key={showtime.theater._id} value={showtime.address}>
            {showtime.address}
          </option>
        ))}
      </Select>
    </>
  )
}

export default TheaterSelect
