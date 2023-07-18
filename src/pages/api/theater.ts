import { NextApiRequest, NextApiResponse } from 'next'

import Theater, { ITheater } from '@/models/Theater'
import connectDB from '@/services/dbConnect'

const createDummyTheaters = async () => {
  const theaterLocations = [
    {
      name: '아산',
      screens: ['1관', '2관', '3관', '4관'],
    },
    {
      name: '서울',
      screens: ['1관', '2관', '3관', '4관'],
    },
    {
      name: '천안',
      screens: ['1관', '2관', '3관', '4관'],
    },
  ]

  const results: ITheater[] = []

  for (const locationData of theaterLocations) {
    const newTheater = new Theater({
      name: '창수 영화관',
      address: locationData.name,
      screens: locationData.screens,
    })
    await newTheater.save()
    results.push(newTheater)
  }

  return results
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
