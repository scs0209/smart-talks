import axios from 'axios'

// API 서버의 기본 URL
const API_BASE_URL = 'http://api.example.com'

// API 요청을 보내는 함수들
export const apiService = {
  // GET 요청
  get: async (url: string) => {
    try {
      const response = await axios.get(`${url}`)
      return response.data
    } catch (error) {
      console.error('API GET request failed:', error)
      throw error
    }
  },

  // POST 요청
  post: async (url: string, data: any) => {
    try {
      const response = await axios.post(`${url}`, data)
      return response.data
    } catch (error) {
      console.error('API POST request failed:', error)
      throw error
    }
  },

  // PUT 요청
  put: async (url: string, data: any) => {
    try {
      const response = await axios.put(`${url}`, data)
      return response.data
    } catch (error) {
      console.error('API PUT request failed:', error)
      throw error
    }
  },

  // DELETE 요청
  delete: async (url: string) => {
    try {
      const response = await axios.delete(`${url}`)
      return response.data
    } catch (error) {
      console.error('API DELETE request failed:', error)
      throw error
    }
  },
}

export const getUserByEmail = async (email: string) => {
  try {
    // 서버에 이메일을 전달하여 사용자 정보를 요청
    const response = await axios.get(`/api/user?email=${email}`)
    const user = response.data
    return user
  } catch (error) {
    throw new Error('Failed to fetch user')
  }
}

// 비밀번호 변경
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  session: any,
) {
  try {
    const response = await axios.put(
      '/api/change-password',
      {
        currentPassword,
        newPassword,
        session,
      },
      {
        withCredentials: true,
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update password')
  }
}

// 비밀번호 찾기
export async function sendTempPasswordEmail(
  email: string,
  receiveEmail: string,
): Promise<void> {
  try {
    await axios.post(
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
