import axios from 'axios'

// API 요청을 보내는 함수들
const apiService = {
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

export default apiService
