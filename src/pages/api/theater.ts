import Theater, { ITheater } from '@/models/Theater'
import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    const theaters = await Theater.find({})
    res.status(200).json({ theaters })
  } else if (req.method === 'POST') {
    try {
      const newTheater: ITheater = new Theater({
        name: 'Dummy Theater',
        // 필요한 나머지 필드를 추가하세요.
      })
      await newTheater.save()
      res.status(200).json({
        success: true,
        theater: newTheater,
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
