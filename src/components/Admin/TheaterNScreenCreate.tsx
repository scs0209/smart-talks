import { Label, Select } from 'flowbite-react'
import { useSelector } from 'react-redux'

import { useAdminPage } from '@/contexts/AdminContext'
import { RootState } from '@/redux/store'

const TheaterNScreenCreate = () => {
  const { theaterId, setTheaterId, screenName, setScreenName } = useAdminPage()
  const {
    theaters,
    loading: theaterLoading,
    error: theaterError,
  } = useSelector((state: RootState) => state.theaters)

  const selectedTheater = theaters.find((t) => t._id === theaterId)
  const theaterScreens: any = selectedTheater ? selectedTheater.screens : []

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
        onChange={(e) => setTheaterId(e.target.value)}
        required
      >
        <option value="">- Select a theater -</option>
        {theaters.map((theater) => (
          <option key={theater._id} value={theater._id}>
            {theater.name}
          </option>
        ))}
      </Select>
      <Label htmlFor="screen-select" value="Screen:" />
      <Select
        id="screen-select"
        value={screenName}
        onChange={(e) => setScreenName(e.target.value)}
        required
      >
        <option value="">- Select a screen -</option>
        {theaterScreens.map((screen: any, i: number) => (
          <option key={screen.id} value={screen.id}>
            {screen}
          </option>
        ))}
      </Select>
    </>
  )
}

export default TheaterNScreenCreate
