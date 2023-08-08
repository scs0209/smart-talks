import { NextApiRequest, NextApiResponse } from 'next'

import Movie from '@/models/Movie'
import connectDB from '@/services/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    try {
      const movies = await Movie.find({})
      res.status(200).json(movies)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movies data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

// 이 코드는 Next.js에서 API 라우터로 사용되는 엔드포인트를 정의합니다. 이 라우터는 클라이언트나 다른 API로부터 요청을 받아 이에 따른 작업을 실행하고 응답을 돌려 줍니다. 구체적으로 이 코드는 다음 작업들을 수행합니다.
// MongoDB 데이터베이스에 연결하기 위해 connectDB를 통해 초기화 작업을 합니다.
// 클라이언트로부터 받은 요청(req)의 메서드에 따라 다음 작업을 합니다.
// 만약 요청 메서드가 'POST'이면, 요청 본문에서 영화 데이터(JSON 데이터 형태로 예상)를 가지고 와서 saveMovieData 함수를 호출하여 데이터를 MongoDB 데이터베이스에 저장합니다.
// 저장이 성공하면, 저장된 영화 데이터와 함께 HTTP 상태 코드 200을 반환합니다. 만약 저장에 실패하면, 에러 메시지와 함께 HTTP 상태 코드 500을 반환합니다.
// POST 요청 외의 다른 메서드는 허용하지 않으며, HTTP 상태 코드 405와 함께 에러 메시지를 반환합니다.
// 간단히 말하면 이 라우터는 영화 데이터를 받아 데이터베이스에 저장하는 API 엔드포인트를 구현한 것입니다.
