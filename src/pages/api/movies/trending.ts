import { API_KEY, API_URL } from '@/utils/tmdbApiConfig'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const timeWindow = req.query.timeWindow || 'day' // timeWindow 파라미터가 없으면 기본값으로 'day'를 사용합니다.
      const response = await axios.get(
        `${API_URL}/trending/all/${timeWindow}?api_key=${API_KEY}&language=ko-KR`,
      )

      res.status(200).json({ results: response.data.results })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching trending data' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
