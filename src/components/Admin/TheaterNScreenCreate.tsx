import { useAdminPage } from '@/contexts/AdminContext'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

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
      <label htmlFor="theater-select">Theater:</label>
      <select
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
      </select>
      <label htmlFor="screen-select">Screen:</label>
      <select
        id="screen-select"
        value={screenName}
        onChange={(e) => setScreenName(e.target.value)}
        required
      >
        <option value="">- Select a screen -</option>
        {theaterScreens.map((screen: any, i: number) => (
          <option key={i} value={screen.id}>
            {screen}
          </option>
        ))}
      </select>
    </>
  )
}

export default TheaterNScreenCreate
