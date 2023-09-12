/* eslint-disable */
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

  return (
    <ul id="screen-id">
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
  )
}

export default ScreenSelect
