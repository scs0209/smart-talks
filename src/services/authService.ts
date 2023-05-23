import axios from 'axios'

interface SignUpData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export default async function signUp(data: SignUpData) {
  try {
    const response = await axios.post('/api/user', data)
    if (response.status === 200) {
      console.log('회원가입이 완료되었습니다.')
      // 또는 다른 방식으로 회원가입 완료 메시지를 표시할 수 있습니다.
    }
    return response.data
  } catch (error) {
    console.error('회원가입 중 오류가 발생했습니다.', error)
    throw error
  }
}
