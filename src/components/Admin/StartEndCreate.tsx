import { useAdminPage } from '@/contexts/AdminContext'
import { Input } from '@mui/material'
import { Label } from 'flowbite-react'

const StartEndCreate = () => {
  const { startTime, setStartTime, endTime, setEndTime } = useAdminPage()

  return (
    <div className="flex justify-between mt-4">
      <Label htmlFor="start-time" value="Start Time" />
      <Input
        type="datetime-local"
        id="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <Label htmlFor="end-time" value="End Time" />
      <Input
        type="datetime-local"
        id="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
    </div>
  )
}

export default StartEndCreate
