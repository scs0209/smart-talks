import { client } from './client'

export const getUserByEmail = async (email: string) => {
  try {
    const response = await client.get(`/api/user?email=${email}`)
    const user = response.data
    return user
  } catch (error) {
    throw new Error('Failed to fetch user')
  }
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  session: any,
) => {
  try {
    const response = await client.put('/api/change-password', {
      currentPassword,
      newPassword,
      session,
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update password')
  }
}

export const sendTempPasswordEmail = async (
  email: string,
  receiveEmail: string,
): Promise<void> => {
  try {
    await client.post(
      '/api/find-password',
      { email, receiveEmail },
      {
        withCredentials: true,
      },
    )
  } catch (error) {
    throw new Error('Failed to send temporary password email')
  }
}
