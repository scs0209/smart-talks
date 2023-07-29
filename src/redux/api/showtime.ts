import { client } from './client'

export const getShowtimesAPI = async () => {
  const { data } = await client.get('/api/showtime')
  return data
}
