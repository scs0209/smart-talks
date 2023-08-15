import { Label } from 'flowbite-react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setEndTime, setStartTime } from '@/redux/reducers/showtimeSlice'

const StartEndCreate = () => {
  const { startTime, endTime } = useSelector(
    (state: RootState) => state.showtimes,
  )
  const dispatch = useDispatch()

  return (
    <div className="flex justify-between mt-4">
      <Label htmlFor="start-time" value="Start Time" />
      <input
        type="datetime-local"
        id="start-time"
        value={startTime}
        onChange={(e) => dispatch(setStartTime(e.target.value))}
        required
      />
      <Label htmlFor="end-time" value="End Time" />
      <input
        type="datetime-local"
        id="end-time"
        value={endTime}
        onChange={(e) => dispatch(setEndTime(e.target.value))}
        required
      />
    </div>
  )
}

export default StartEndCreate
