import { client } from './client'

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
