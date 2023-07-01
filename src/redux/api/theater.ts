import axios from 'axios'

const backUrl = 'http://localhost:3000/'

export const getTheatersAPI = async () => {
  const { data } = await axios.get(`${backUrl}/api/theater`)
  return data.theaters
}

export const createDummyTheatersAPI = async () => {
  const { data } = await axios.post(`${backUrl}/api/theater`)
  return data.theaters
}
