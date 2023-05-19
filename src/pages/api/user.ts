import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../services/dbConnect'
import User, { IUser } from '../../models/User'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const { username, email, password, firstName, lastName } = req.body

      const newUser: IUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
      })
      await newUser.save()

      res.status(200).json({
        success: true,
        user: newUser,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message: message })
    }
  }
}
