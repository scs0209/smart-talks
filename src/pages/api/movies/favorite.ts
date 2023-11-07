import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/services/dbConnect'
import UserFavorite from '@/models/UserFavorite'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, movieId } = req.query
  await connectDB()

  if (req.method === 'GET') {
    try {
      const userFavorites = await UserFavorite.find({
        userId: userId,
      })
      res.status(200).json(userFavorites)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user favorites data' })
    }
  } else if (req.method === 'PATCH') {
    const { userId, movieId, mediaType, action } = req.body

    const userFavorite = await UserFavorite.findOne({ userId, movieId })
    if (!userFavorite && action === 'add') {
      const newUserFavorite = new UserFavorite({ userId, movieId, mediaType })
      await newUserFavorite.save()
      res.status(200).json(newUserFavorite)
    } else if (userFavorite && action === 'remove') {
      await UserFavorite.findByIdAndRemove(userFavorite._id)
      res.status(200).json({ message: 'Removed from favorites' })
    } else {
      res
        .status(400)
        .json({ error: 'Invalid action or movie is not in favorites' })
    }
  }
}
