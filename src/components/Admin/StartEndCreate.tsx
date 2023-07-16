import { useAdminPage } from '@/contexts/AdminContext'

const StartEndCreate = () => {
  const { startTime, setStartTime, endTime, setEndTime } = useAdminPage()

  return (
    <>
      <label htmlFor="start-time">Start Time</label>
      <input
        type="datetime-local"
        id="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <label htmlFor="end-time">End Time</label>
      <input
        type="datetime-local"
        id="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
    </>
  )
}

export default StartEndCreate
