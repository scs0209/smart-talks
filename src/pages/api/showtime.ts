import Showtime, { IShowtime } from '@/models/Showtime'
import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    const showtimes = await Showtime.find({})
    res.status(200).json({ showtimes })
  } else if (req.method === 'POST') {
    try {
      const newShowtime: IShowtime = new Showtime({
        theater: 'Theater Id', // 실제 극장 ID로 변경하세요
        movie: 'Movie Id', // 실제 영화 ID로 변경하세요
        showDate: new Date(), // 원하는 시간대로 변경하세요
        // 필요한 나머지 필드를 추가하세요
      })
      await newShowtime.save()
      res.status(200).json({
        success: true,
        showtime: newShowtime,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}
