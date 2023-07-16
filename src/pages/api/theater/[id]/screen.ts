import Theater from '@/models/Theater'
import connectDB from '@/services/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

const screensHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  await connectDB()

  if (req.method === 'GET') {
    try {
      const theater = await Theater.findById(id)

      if (!theater) {
        return res.status(404).json({ message: 'Theater not found' })
      }

      res.status(200).json({ screens: theater.screens })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}

export default screensHandler
