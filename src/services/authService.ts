import axios from 'axios'

interface SignUpData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export async function signUp(data: SignUpData) {
  return await axios.post('/api/user', data)
}
