import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const query = req.query.query as string
      const page = (req.query.page as string) || '1' // 페이지 번호를 가져오거나 기본값 1을 사용합니다.
      const { data } = await axios.get(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ko&page=${page}`,
      )

      res.status(200).json({ results: data.results })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching search results' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
