import { NextApiRequest, NextApiResponse } from 'next'

import Theater, { ITheater } from '@/models/Theater'
import connectDB from '@/services/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB()

  if (req.method === 'GET') {
    try {
      const theaters = await Theater.aggregate([
        {
          $group: {
            _id: '$name',
            locations: {
              $push: {
                id: '$_id',
                address: '$address',
              },
            },
          },
        },
      ])

      res.status(200).json(theaters)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching theaters' })
    }
  } else if (req.method === 'POST') {
    const { name, address } = req.body

    try {
      const theater = new Theater({ name, address } as ITheater)
      await theater.save()
      res.status(201).json({ message: 'Theater created successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error creating theater' })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}
