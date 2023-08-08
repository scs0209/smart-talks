import { client } from './client'

export const getScreensAPI = async (theaterId: string) => {
  const { data } = await client.get('/api/screen', {
    params: {
      theaterId,
    },
  })

  return data
}

export const createScreenAPI = async (
  screenName: string,
  locationId: string,
) => {
  const { data } = await client.post('/api/screen', {
    screenName,
    locationId,
  })

  return data
}
