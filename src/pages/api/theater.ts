import { NextApiRequest, NextApiResponse } from 'next'

import Theater, { ITheater } from '@/models/Theater'
import connectDB from '@/services/dbConnect'

const theaterLocations = [
  {
    name: '창수 영화관',
    branches: [
      {
        address: '아산',
        screens: ['1관', '2관', '3관', '4관'],
      },
      {
        address: '서울',
        screens: ['1관', '2관', '3관', '4관'],
      },
      {
        address: '천안',
        screens: ['1관', '2관', '3관', '4관'],
      },
    ],
  },
  {
    name: 'cgv',
    branches: [
      {
        address: '서울',
        screens: ['1관', '2관', '3관', '4관'],
      },
      {
        address: '천안',
        screens: ['1관', '2관', '3관', '4관'],
      },
    ],
  },
]

const createDummyTheaters = async () => {
  return Promise.all(
    theaterLocations.map(async (theaterData) => {
      const newTheater = new Theater({
        name: theaterData.name,
        branches: theaterData.branches,
      })
      await newTheater.save()
      return newTheater
    }),
  )
}

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
      const dummyTheaters = await createDummyTheaters()
      res.status(200).json({
        success: true,
        theaters: dummyTheaters,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}
