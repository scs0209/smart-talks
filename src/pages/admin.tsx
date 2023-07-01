import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { backUrl } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTheaters } from '@/redux/actions/theater'
import { AppDispatch, RootState } from '@/redux/store'

const AdminPage = () => {
  const [movieId, setMovieId] = useState('')
  const [theaterId, setTheaterId] = useState('')
  const [screenName, setScreenName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const { theaters, loading, error } = useSelector((state: RootState) => {
    console.log(state)
    return state.theaters
  })
  const dispatch = useDispatch<AppDispatch>()
  const selectedTheater = theaters.find((t) => t._id === theaterId)
  const theaterScreens = selectedTheater ? selectedTheater.screens : []
  console.log(theaters)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const showtimeData = {
      movie_id: movieId,
      theaterId: theaterId,
      screen_name: screenName,
      start_time: new Date(startTime),
      end_time: new Date(endTime),
    }

    try {
      await axios.post(`${backUrl}/api/showtime`, showtimeData)
      alert('상영시간 생성 완성!')
    } catch (error) {
      console.error('생성 중 에러가 발생했습니다.', error)
      alert('상영시간 생성에 실패했습니다!')
    }
  }

  useEffect(() => {
    dispatch(fetchTheaters())
  }, [dispatch])

  return (
    <div>
      <h1>Create Showtime</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-id">Movie ID</label>
        <input
          id="movie-id"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        />
        <label htmlFor="theater-select">Theater:</label>
        <select
          id="theater-select"
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
          required
        >
          <option value="">- Select a theater -</option>
          {theaters.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>
        <label htmlFor="screen-select">Screen:</label>
        <select
          id="screen-select"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
          required
        >
          <option value="">- Select a screen -</option>
          {/* {theaterScreens.map((screen) => (
            <option key={screen.id} value={screen.id}>
              {screen}
            </option>
          ))} */}
        </select>
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
        <button type="submit">Create Showtime</button>
      </form>
    </div>
  )
}

export default AdminPage
