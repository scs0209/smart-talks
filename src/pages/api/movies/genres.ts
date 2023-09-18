import { API_KEY, API_URL } from '@/utils/tmdbApiConfig'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Movie genres 데이터 가져오기
      const movieGenreResponse = await axios.get(
        `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`,
      )

      // TV genres 데이터 가져오기
      const tvGenreResponse = await axios.get(
        `${API_URL}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`,
      )

      // 두 장르 리스트를 합치기
      const combinedGenres = [
        ...movieGenreResponse.data.genres,
        ...tvGenreResponse.data.genres,
      ]

      res.status(200).json({ results: combinedGenres })
    } catch (error) {
      res.status(500).json({ message: `Error fetching genres` })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
