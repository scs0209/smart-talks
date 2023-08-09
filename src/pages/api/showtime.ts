/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '@/services/dbConnect'
import Showtime from '@/models/Showtime'
import Theater from '@/models/Theater'
import Screen from '@/models/Screen'
import Movie from '@/models/Movie'

const showsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'GET') {
    try {
      const locationId = req.query.locationId
      const movieId = req.query.movieId
      const screenId = req.query.screenId

      if (!locationId) {
        res.status(400).json({ error: 'Theater ID is required' })
        return
      }

      if (!movieId) {
        res.status(400).json({ error: 'Movie ID is required' })
        return
      }

      if (!screenId) {
        res.status(400).json({ error: 'Screen ID is required' })
        return
      }

      const theater = await Theater.findById(locationId)

      if (!theater) {
        res.status(400).json({ error: 'Invalid theater ID' })
        return
      }

      const movie = await Movie.findById(movieId)

      if (!movie) {
        res.status(400).json({ error: 'Invalid movie ID' })
        return
      }

      const screen = await Screen.findById(screenId)

      if (!screen) {
        res.status(400).json({ error: 'Invalid screen ID' })
        return
      }

      const shows = await Showtime.find({ theater, movie, screen })
        .populate('movie')
        .populate('screen')
      res.status(200).json(shows)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching shows' })
    }
  } else if (req.method === 'POST') {
    const { movieId, locationId, screenId, startTime, endTime } = req.body

    try {
      const movie = await Movie.findById(movieId)

      if (!movie) {
        res.status(400).json({ error: 'Invalid movie ID' })
        return
      }

      const theater = await Theater.findById(locationId)

      if (!theater) {
        res.status(400).json({ error: 'Invalid theater ID' })
        return
      }

      const screen = await Screen.findById(screenId)

      if (!screen) {
        res.status(400).json({ error: 'Invalid screen ID' })
        return
      }

      const showtime = new Showtime({
        movie,
        theater,
        screen,
        startTime,
        endTime,
      })

      await showtime.save()
      res.status(201).json({ message: 'Showtime created successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error creating showtime' })
    }
  } else {
    res.status(405).json({ message: 'Unsupported method.' })
  }
}

export default showsHandler
