import axios from 'axios'
import { getSession } from 'next-auth/react'

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://smart-talks.vercel.app/'

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)

client.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    console.log(session?.user)
    if (session) {
      config.headers.Authorization = `Bearer ${session.user}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
