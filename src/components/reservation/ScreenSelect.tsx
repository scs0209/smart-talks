import { Label, Select } from 'flowbite-react'

import { useReservation } from '@/contexts/ReservationContext'
import { useGetScreensQuery } from '@/redux/api/screenApi'

const ScreenSelect = () => {
  const { screenId, setScreenId, locationId } = useReservation()
  const { data: screens } = useGetScreensQuery(locationId)

  console.log(screenId)

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
