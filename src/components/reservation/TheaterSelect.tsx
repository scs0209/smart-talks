import { Label, Select } from 'flowbite-react'

import { useGetTheatersQuery } from '@/redux/api/theaterApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  setLocationId,
  setSelectedTheater,
  setTheaterId,
} from '@/redux/reducers/reservationSlice'

const TheaterSelect = () => {
  const { data: theaters, isLoading, isError } = useGetTheatersQuery()
  const { theaterId, locationId, selectedTheater } = useSelector(
    (state: RootState) => state.reservations,
  )
  const dispatch = useDispatch()

  console.log(theaters, theaterId)

  const handleTheaterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheaterId(e.target.value))
    if (theaters) {
      const chosenTheater = theaters.find((t) => t._id === e.target.value)
      dispatch(setSelectedTheater(chosenTheater || null))
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocationId(e.target.value))
    console.log(locationId)
  }

  return (
    <>
      <Label htmlFor="theater-id" value="극장 선택" />
      <Select
        id="theater-id"
        value={theaterId}
        onChange={handleTheaterChange}
        required
      >
        <option value="">- 극장을 선택하세요. -</option>
        {theaters?.map((theater) => (
          <option key={theater._id} value={theater._id}>
            {theater._id}
          </option>
        ))}
      </Select>
      <Label htmlFor="addressId" value="지점 선택" />
      <Select
        id="addressId"
        value={locationId}
        onChange={handleLocationChange}
        required
      >
        <option value="">- 지점을 선택하세요. -</option>
        {selectedTheater?.locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.address}
          </option>
        ))}
      </Select>
    </>
  )
}

export default TheaterSelect
