import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import connectDB from '../../services/dbConnect'
import User, { IUser } from '../../models/User'
import NextAuth from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'POST') {
    try {
      const { username, email, password, firstName, lastName } = req.body

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser: IUser = new User({
        username,
        email,
        password: hashedPassword,
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
  } else {
    await NextAuth(req, res, authOptions)
  }
}
