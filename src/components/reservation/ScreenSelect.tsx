import { Label, Select } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'

import { useReservation } from '@/contexts/ReservationContext'
import { AppDispatch, RootState } from '@/redux/store'
import { getScreens } from '@/redux/actions/screen'
import { useEffect } from 'react'

const ScreenSelect = () => {
  const { screens } = useSelector((state: RootState) => state.screens)
  const dispatch = useDispatch<AppDispatch>()
  const { screenId, setScreenId, locationId } = useReservation()

  console.log(screenId)

  useEffect(() => {
    dispatch(getScreens(locationId))
  }, [locationId])

  return (
    <>
      <Label htmlFor="screen-id" value="스크린 선택" />
      <Select
        id="screen-id"
        value={screenId}
        onChange={(e) => setScreenId(e.target.value)}
        required
      >
        <option value="">- 스크린을 선택하세요. -</option>
        {screens.map((screen) => (
          <option key={screen._id} value={screen._id}>
            {screen.screenName}
          </option>
        ))}
      </Select>
    </>
  )
}

export default ScreenSelect
