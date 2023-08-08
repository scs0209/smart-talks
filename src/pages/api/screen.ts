/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next'

import Theater from '@/models/Theater'
import connectDB from '@/services/dbConnect'
import Screen from '@/models/Screen'

const screensHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'GET') {
    try {
      const theaterId = req.query.theaterId

      if (!theaterId) {
        res.status(400).json({ error: 'Theater ID is required' })
        return
      }

      const theater = await Theater.findById(theaterId)

      if (!theater) {
        res.status(400).json({ error: 'Invalid theater ID' })
        return
      }

      const screens = await Screen.find({ theater })
      res.status(200).json(screens)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching screens' })
    }
  } else if (req.method === 'POST') {
    const { screenName, locationId } = req.body

    try {
      const theater = await Theater.findById(locationId)

      if (!theater) {
        res.status(400).json({ error: 'Invalid theater ID' })
        return
      }

      // Get the address from the location
      const address = theater.address

      // Create a new screen with screenName, theater and address information
      const screen = new Screen({
        screenName,
        theater,
        address,
      })

      await screen.save()
      res.status(201).json({ message: 'Screen created successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error creating screen' })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}

export default screensHandler
