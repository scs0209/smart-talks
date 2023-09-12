import { Label } from 'flowbite-react'

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

  const handleTheaterChange = (id: string) => {
    dispatch(setTheaterId(id))
    if (theaters) {
      const chosenTheater = theaters.find((t) => t._id === id)
      dispatch(setSelectedTheater(chosenTheater || null))
    }
  }

  const handleLocationChange = (id: string) => {
    dispatch(setLocationId(id))
    console.log(locationId)
  }

  return (
    <>
      <Label htmlFor="theater-id" value="극장 선택" />
      <ul id="theater-id">
        <li>- 극장을 선택하세요. -</li>
        {theaters?.map((theater) => (
          <li
            key={theater._id}
            onClick={() => handleTheaterChange(theater._id)}
            className={`cursor-pointer ${
              theater._id === theaterId ? 'font-bold' : ''
            }`}
          >
            {theater._id}
          </li>
        ))}
      </ul>
      <Label htmlFor="addressId" value="지점 선택" />
      <ul id="address-id">
        <li>- 지점을 선택하세요. -</li>
        {selectedTheater?.locations.map((location) => (
          <li
            key={location.id}
            onClick={() => handleLocationChange(location.id)}
            className={`cursor-pointer ${
              location.id === locationId ? 'font-bold' : ''
            }`}
          >
            {location.address}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TheaterSelect
