import { client } from './client'

export const getShowtimesAPI = async (
  movieId: string,
  locationId: string,
  screenId: string,
) => {
  const { data } = await client.get('/api/showtime', {
    params: {
      movieId,
      locationId,
      screenId,
    },
  })
  return data
}

export const createShowtimeAPI = async (showtime: {
  movieId: string
  locationId: string
  screenId: string
  startTime: Date
  endTime: Date
}) => {
  const { data } = await client.post('/api/showtime', showtime)
  return data
}
