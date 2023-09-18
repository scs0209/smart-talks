import { API_KEY, API_URL } from '@/utils/tmdbApiConfig'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const mediaType = req.query.mediaType || 'movie' // mediaType 파라미터가 없으면 기본값으로 'movie'를 사용합니다.
      const response = await axios.get(
        `${API_URL}/${mediaType}/popular?api_key=${API_KEY}&language=ko-KR`,
      )

      const resultsWithMediaType = response.data.results.map((item: any) => ({
        ...item,
        media_type: mediaType,
      }))

      res.status(200).json({ results: resultsWithMediaType })
    } catch (error) {
      res.status(500).json({ message: `Error fetching popular data` })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
