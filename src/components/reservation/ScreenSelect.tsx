import { Label, Select } from 'flowbite-react'

import { useGetScreensQuery } from '@/redux/api/screenApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setScreenId } from '@/redux/reducers/reservationSlice'

const ScreenSelect = () => {
  const { screenId, locationId } = useSelector(
    (state: RootState) => state.reservations,
  )
  const dispatch = useDispatch()
  const { data: screens } = useGetScreensQuery(locationId)

  console.log(screenId)

  return (
    <>
      <Label htmlFor="screen-id" value="스크린 선택" />
      <Select
        id="screen-id"
        value={screenId}
        onChange={(e) => dispatch(setScreenId(e.target.value))}
        required
      >
        <option value="">- 스크린을 선택하세요. -</option>
        {screens?.map((screen) => (
          <option key={screen._id} value={screen._id}>
            {screen.screenName}
          </option>
        ))}
      </Select>
    </>
  )
}

export default ScreenSelect
