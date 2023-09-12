import { Label } from 'flowbite-react'

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
      <ul id="screen-id">
        <li>- 스크린을 선택하세요. -</li>
        {screens?.map((screen) => (
          <li
            key={screen._id}
            onClick={() => dispatch(setScreenId(screen._id))}
            className={`cursor-pointer ${
              screen._id === screenId ? 'font-bold' : ''
            }`}
          >
            {screen.screenName}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ScreenSelect
