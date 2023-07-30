import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

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
