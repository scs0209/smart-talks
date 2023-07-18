import axios from 'axios'

import { backUrl } from '@/config'

export const getShowtimesAPI = async () => {
  const { data } = await axios.get(`${backUrl}/api/showtime`)
  console.log(data)
  return data
}
