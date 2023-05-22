import { IAnswer } from '@/models/Answer'
import { IQuestion } from '@/models/Question'
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

// 질문에 관한 api
export const QuestionService = {
  getQuestions: async (): Promise<IQuestion[]> => {
    try {
      const response = await axios.get('/api/questions')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch questions')
    }
  },

  // 다른 API 메소드들을 여기에 추가해주세요.
}

// 답변에 관한 api
export const AnswerService = {
  getAnswers: async (): Promise<IAnswer[]> => {
    try {
      const response = await axios.get('api/answers')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch answers')
    }
  },

  // 다른 API 메소드들을 여기에 추가해주세요.
}
