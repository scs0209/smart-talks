/* eslint-disable */
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

  const handleTheaterChange = (id: string) => {
    dispatch(setTheaterId(id))
    if (theaters) {
      const chosenTheater = theaters.find((t) => t._id === id)
      dispatch(setSelectedTheater(chosenTheater || null))
    }
  }

  const handleLocationChange = (id: string) => {
    dispatch(setLocationId(id))
  }

  return (
    <>
      <ul id="theater-id">
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

      <ul id="address-id">
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
