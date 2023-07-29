import { client } from './client'

interface SignUpData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export const signUp = async (data: SignUpData) => {
  const response = await client.post('/api/user', data)
  return response.data
}
