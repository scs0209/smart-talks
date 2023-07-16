import { useReservation } from '@/contexts/ReservationContext'

const totalRows = 10 // 행의 수
const totalColumns = 10 // 열의 수

const SeatTable = () => {
  const { selectedSeats, setSelectedSeats } = useReservation()
  const generateSeats = () => {
    const seats = Array.from(
      { length: totalRows * totalColumns },
      (_, i) => i + 1,
    )
    const rows = []

    for (let r = 0; r < totalRows; r++) {
      const row = []
      for (let c = 0; c < totalColumns; c++) {
        row.push(seats.shift())
      }
      rows.push(row)
    }

    return rows
  }

  const onClickSeat = (seatId: number) => {
    setSelectedSeats((prevSelectedSeats: number[]) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat: number) => seat !== seatId)
      }
      return [...prevSelectedSeats, seatId]
    })
  }

  const seatTable = generateSeats()

  return (
    <div className="flex flex-col items-center my-5">
      {seatTable.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((seatId, columnIndex) => (
            <button
              key={columnIndex}
              className={`seat p-1 m-1 border border-gray-300 rounded ${
                selectedSeats.includes(seatId || -1)
                  ? 'bg-yellow-400'
                  : 'bg-gray-200'
              } cursor-pointer`}
              onClick={() => onClickSeat(seatId || -1)}
            >
              {seatId}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SeatTable
