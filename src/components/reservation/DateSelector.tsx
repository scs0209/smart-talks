import { VFC, useCallback, useState } from 'react'

interface Props {
  onDateSelect: (date: Date) => void
}

const DateSelector: VFC<Props> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = useCallback(
    (e: any) => {
      const date = e.target.valueAsDate

      setSelectedDate(date)
      onDateSelect(date)
    },
    [onDateSelect],
  )

  return (
    <div>
      <label htmlFor="date">날짜 선택:</label>
      <input
        type="date"
        id="date"
        value={selectedDate.toISOString().substr(0, 10)}
        onChange={handleDateChange}
      />
    </div>
  )
}

export default DateSelector
