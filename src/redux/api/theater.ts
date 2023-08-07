import { client } from './client'

export const getTheatersAPI = async () => {
  const { data } = await client.get('/api/theater')
  console.log(data)
  return data
}

export const createTheaterAPI = async (name: string, address: string) => {
  const { data } = await client.post('/api/theater', { name, address })
  return data
}

export const getTheaterScreensAPI = async (theaterId: string) => {
  const { data } = await client.get(`/api/theater/${theaterId}/screens`)
  return data.screens
}
