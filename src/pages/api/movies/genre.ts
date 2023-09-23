import { API_KEY, API_URL } from '@/utils/tmdbApiConfig'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const mediaType = req.query.mediaType || 'movie'

      // Fetch genres data based on mediaType
      const genreResponse = await axios.get(
        `${API_URL}/genre/${mediaType}/list?api_key=${API_KEY}&language=ko-KR`,
      )

      res.status(200).json({ results: genreResponse.data.genres })
    } catch (error) {
      res.status(500).json({ message: `Error fetching genres` })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
