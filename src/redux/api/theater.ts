import { client } from './client'

export const getTheatersAPI = async () => {
  const { data } = await client.get('/api/theater')
  return data.theaters
}

export const createDummyTheatersAPI = async () => {
  const { data } = await client.post('/api/theater')
  return data.theaters
}

export const getTheaterScreensAPI = async (theaterId: string) => {
  const { data } = await client.get(`/api/theater/${theaterId}/screens`)
  return data.screens
}
