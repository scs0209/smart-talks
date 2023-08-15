import { Label, Select } from 'flowbite-react'

import { useGetTheatersQuery } from '@/redux/api/theaterApi'
import { useGetScreensQuery } from '@/redux/api/screenApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  setLocationId,
  setScreenId,
  setSelectedTheater,
  setTheaterId,
} from '@/redux/reducers/showtimeSlice'

const TheaterNScreenCreate = () => {
  const { theaterId, locationId, screenId, selectedTheater } = useSelector(
    (state: RootState) => state.showtimes,
  )
  const dispatch = useDispatch()
  const {
    data: theaters,
    isLoading: theaterLoading,
    isError: theaterError,
  } = useGetTheatersQuery()

  const {
    data: screens,
    isLoading: screenLoading,
    isError: screenError,
  } = useGetScreensQuery(locationId)

  const handleTheaterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheaterId(e.target.value))
    if (theaters) {
      const chosenTheater = theaters.find((t) => t._id === e.target.value)
      dispatch(setSelectedTheater(chosenTheater || null))
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocationId(e.target.value))
  }

  console.log(screens)

  if (theaterLoading) {
    return <div>Loading...</div>
  }

  if (theaterError) {
    return <div>Error: {theaterError}</div>
  }

  return (
    <>
      <Label htmlFor="theater-select" value="Theater:" />
      <Select
        id="theater-select"
        value={theaterId}
        onChange={handleTheaterChange}
        required
      >
        <option value="">- Select a theater -</option>
        {theaters?.map((theater) => (
          <option key={theater._id} value={theater._id}>
            {theater._id}
          </option>
        ))}
      </Select>
      <Label htmlFor="branch-select" value="Branch:" />
      <Select
        id="branch-select"
        value={locationId}
        onChange={handleLocationChange}
        required
      >
        <option value="">- Select a branch -</option>
        {selectedTheater &&
          selectedTheater.locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.address}
            </option>
          ))}
      </Select>
      <Label htmlFor="screen-select" value="Screen:" />
      <Select
        id="screen-select"
        value={screenId}
        onChange={(e) => dispatch(setScreenId(e.target.value))}
        required
      >
        <option value="">- Select a screen -</option>
        {screens?.map((screen) => (
          <option key={screen._id} value={screen._id}>
            {screen.screenName}
          </option>
        ))}
      </Select>
    </>
  )
}

export default TheaterNScreenCreate
