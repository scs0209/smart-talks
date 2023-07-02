import { backUrl } from '@/config'
import axios from 'axios'

export const getShowtimesAPI = async () => {
  const { data } = await axios.get(`${backUrl}/api/showtime`)
  console.log(data)
  return data
}
