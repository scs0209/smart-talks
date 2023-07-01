import axios from 'axios'
import { backUrl } from '../../../config'

export const getTheatersAPI = async () => {
  const { data } = await axios.get(`${backUrl}/api/theater`)
  return data.theaters
}

export const createDummyTheatersAPI = async () => {
  const { data } = await axios.post(`${backUrl}/api/theater`)
  return data.theaters
}
